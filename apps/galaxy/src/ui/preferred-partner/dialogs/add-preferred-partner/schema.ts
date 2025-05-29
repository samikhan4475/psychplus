import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const requiredString = z.string().min(1, 'Required')
const optionalString = z.string().optional().default('')
const requiredDate = z
  .custom<DateValue>()
  .refine((val) => val, {
    message: 'Required',
  })
  .nullable()

const PhoneNumberSchema = z.object({
  type: optionalString,
  number: requiredString,
  extension: optionalString,
  comment: optionalString,
})

const AddressSchema = z.object({
  type: requiredString,
  street1: requiredString,
  street2: optionalString,
  city: requiredString,
  state: requiredString,
  country: requiredString,
  postalCode: requiredString,
  geoCoordinates: z
    .object({
      longitude: z.number(),
      latitude: z.number(),
      altitude: z.number(),
    })
    .optional(),
  timeZoneId: optionalString,
})

const ContactDetailsSchema = z.object({
  email: optionalString,
  emailVerificationStatus: optionalString,
  phoneNumbers: z.array(PhoneNumberSchema).optional(),
  addresses: z.array(AddressSchema),
  isMailingAddressSameAsPrimary: z.boolean(),
})
const schema = z
  .object({
    id: optionalString,
    name: requiredString,
    individualRate: requiredString,
    coupleRate: requiredString,
    familyRate: requiredString,
    subscriptionStatus: optionalString,
    payerStatus: requiredString,
    fixedPaymentType: optionalString,
    billingFrequency: requiredString,
    plusChargeAmount: optionalString,
    serviceChargeAmount: optionalString,
    startDate: requiredDate,
    nextPaymentDate: requiredDate,
    contactDetails: ContactDetailsSchema,
    recordStatus: requiredString,
    isTest: z.boolean(),
    paymentStatus: optionalString,
    totalUserIds: z.number().optional(),
    familiesCount: z.number().optional(),
    couplesCount: z.number().optional(),
    individualsCount: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    const {
      id,
      contactDetails,
      individualRate,
      coupleRate,
      familyRate,
      plusChargeAmount,
      serviceChargeAmount,
      totalUserIds,
      familiesCount,
      couplesCount,
      individualsCount,
    } = data

    const isNew = !id || id.trim() === ''

    const numberFields = [
      { key: 'totalUserIds', value: totalUserIds },
      { key: 'familiesCount', value: familiesCount },
      { key: 'couplesCount', value: couplesCount },
      { key: 'individualsCount', value: individualsCount },
    ]
    const stringFields = [
      { key: 'plusChargeAmount', value: plusChargeAmount },
      { key: 'serviceChargeAmount', value: serviceChargeAmount },
      { key: 'familyRate', value: familyRate },
      { key: 'coupleRate', value: coupleRate },
      { key: 'individualRate', value: individualRate },
    ]

    if (!isNew) {
      numberFields.forEach(({ key, value }) => {
        if (value === undefined || value === null || value < 1) {
          ctx.addIssue({
            path: [key],
            message: 'Required',
            code: z.ZodIssueCode.custom,
          })
        }
      })

      stringFields.forEach(({ key, value }) => {
        if (!value || value.trim().length < 1) {
          ctx.addIssue({
            path: [key],
            message: 'Required',
            code: z.ZodIssueCode.custom,
          })
        }
      })
    }

    if (!contactDetails.isMailingAddressSameAsPrimary) {
      const mailingAddresses = contactDetails.addresses.filter(
        (addr) => addr.type.toLowerCase() === 'mailing',
      )

      if (mailingAddresses.length === 0) {
        ctx.addIssue({
          path: ['contactDetails.addresses'],
          message: 'Mailing address is required when not same as primary',
          code: z.ZodIssueCode.custom,
        })
      } else {
        const mailingAddress = mailingAddresses[0]
        const fields = ['street1', 'city', 'state', 'postalCode'] as const
        fields.forEach((field) => {
          if (
            !mailingAddress[field] ||
            mailingAddress[field].trim().length < 1
          ) {
            ctx.addIssue({
              path: ['contactDetails.addresses', field],
              message: 'Required',
              code: z.ZodIssueCode.custom,
            })
          }
        })
      }
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
