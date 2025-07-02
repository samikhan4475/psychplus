'use client'

import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { AppointmentType } from '@psychplus-v2/constants'
import { z } from 'zod'
import { validate } from '@psychplus/form'

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
    patientDateOfBirth: validate.optionalString,
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
    requestedTime: validate.optionalString,
    time: validate.optionalString,
    dischargeTime: validate.optionalString,
    referrerFacility: validate.limitedString({ max: 256 }).optional(),
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
    if (data.requestedTime) {
      const tz = getLocalTimeZone()
      const selected = parseDate(data.requestedTime)
      const min = today(tz)
      const max = min.add({ days: 90 })

      if (selected.compare(max) > 0) {
        ctx.addIssue({
          path: ['requestedTime'],
          code: z.ZodIssueCode.custom,
          message: 'Date must be within 90 days from today',
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
