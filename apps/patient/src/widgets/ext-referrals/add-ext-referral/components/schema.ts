'use client'

import { AppointmentType } from '@psychplus-v2/constants'
import { DateValue } from 'react-aria-components'
import { z } from 'zod'
import { validate } from '@psychplus/form'
import { generateCalendarDateToday } from '@/utils'

const addressSchema = z.object({
  type: validate.optionalString.default('Home'),
  street1: validate.optionalString,
  street2: validate.optionalString,
  city: validate.optionalString,
  state: validate.optionalString,
  country: validate.optionalString,
  postalCode: validate.zipCode.or(z.literal('')),
})

const phoneNumberSchema = z.object({
  type: validate.phoneNumberTypeEnum.optional().default('Home'),
  number: validate.phoneNumber.or(z.literal('')),
})
const schema = z
  .object({
    patientName: z.object({
      firstName: validate.requiredName,
      lastName: validate.requiredName,
    }),
    patientDateOfBirth: z.custom<DateValue>().optional(),
    patientContactDetails: z.object({
      phoneNumbers: z.array(phoneNumberSchema).optional(),
      addresses: z.array(addressSchema).optional(),
      isMailingAddressSameAsPrimary: z.boolean().optional(),
      email: validate.email.or(z.literal('')),
    }),
    requestedServices: z.array(validate.optionalString).optional(),
    requestedService: validate.optionalString,
    requestedMedium: validate.optionalString,
    requestedStateCode: validate.optionalString,
    requestedPostalCode: validate.optionalString,
    requestedTime: z.custom<DateValue>().optional(),
    time: validate.optionalString,
    dischargeTime: z.custom<DateValue>().optional(),
    referrerFacility: validate.limitedString({ max: 256 }).optional(),
    externalReferenceId: validate.limitedString({ max: 8 }).optional(),
    referrerName: validate.limitedString({ max: 256 }).optional(),
    referrerShortName: validate.limitedString({ max: 256 }).optional(),
    referrerContactDetails: z.object({
      phoneNumbers: z.array(phoneNumberSchema).optional(),
      addresses: z.array(addressSchema).optional(),
      isMailingAddressSameAsPrimary: z.boolean().optional(),
      email: validate.email.or(z.literal('')),
    }),
    requestedProviderStaffId: validate.numberOnly.optional(),
    source: validate.limitedString({ max: 64 }).optional(),
    additionalComments: validate.limitedString({ max: 2048 }).optional(),
    payerName: validate.optionalString,
  })
  .superRefine((data, ctx) => {
    if (data.requestedMedium === AppointmentType.InPerson) {
      data.patientContactDetails?.addresses?.forEach((address, index) => {
        if (address.type && address.state && !address.postalCode?.trim()) {
          ctx.addIssue({
            path: ['patientContactDetails', 'addresses', index, 'postalCode'],
            code: z.ZodIssueCode.custom,
            message: 'Required',
          })
        }
      })
    }

    if (
      data?.patientDateOfBirth &&
      data.patientDateOfBirth?.compare(generateCalendarDateToday()) > 0
    ) {
      ctx.addIssue({
        path: ['patientDateOfBirth'],
        code: z.ZodIssueCode.custom,
        message: 'Date of Birth cannot be in the future',
      })
    }

    if (data?.requestedTime) {
      const today = generateCalendarDateToday()
      const ninetyDaysLater = today.add({ days: 90 })

      const isBeforeToday = data.requestedTime.compare(today) < 0
      const isAfter90Days = data.requestedTime.compare(ninetyDaysLater) > 0

      if (isBeforeToday || isAfter90Days) {
        ctx.addIssue({
          path: ['requestedTime'],
          code: z.ZodIssueCode.custom,
          message: 'Date must be today or within 90 days from today',
        })
      }
    }
  })

const innerSchema = schema.innerType() // ZodObject

type ContactDetails = z.infer<typeof innerSchema.shape.patientContactDetails>
type SchemaType = z.infer<typeof schema>

type Address = z.infer<typeof addressSchema>
type PhoneNumber = z.infer<typeof phoneNumberSchema>

export {
  schema,
  addressSchema,
  phoneNumberSchema,
  innerSchema,
  type ContactDetails,
  type SchemaType,
  type Address,
  type PhoneNumber,
}
