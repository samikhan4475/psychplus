import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const requiredString = z.string().min(1, 'Required')
const optionalString = z.string().optional().default('')

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
  postalPlus4Code: optionalString,
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
    individualRate: z.number().default(0),
    coupleRate: z.number().default(0),
    familyRate: z.number().default(0),
    subscriptionStatus: optionalString,
    payerStatus: requiredString,
    fixedPaymentType: optionalString,
    billingFrequency: z.enum(['Day', 'Month', 'Year']).default('Month'),
    plusChargeAmount: z.number().default(0),
    serviceChargeAmount: z.number().default(0),
    startDate: z.custom<DateValue>().nullable().optional(),
    nextPaymentDate: z.custom<DateValue>().nullable().optional(),
    contactDetails: ContactDetailsSchema,
    recordStatus: optionalString.default('Active'),
    isTest: z.boolean().default(false),
    paymentStatus: optionalString.default('Successful'),
    totalUserIds: z.number().default(0),
    totalUsers: z.number().default(0),
    familiesCount: z.number().default(0),
    couplesCount: z.number().default(0),
    individualsCount: z.number().default(0),
    isMailingAddressSameAsPrimary: z.enum(['yes', 'no']).default('no'),
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

    const requiredNumberFields = [
      { key: 'totalUserIds', value: totalUserIds },
      { key: 'familiesCount', value: familiesCount },
      { key: 'couplesCount', value: couplesCount },
      { key: 'individualsCount', value: individualsCount },
    ]
    const rateFields = [
      { key: 'plusChargeAmount', value: plusChargeAmount },
      { key: 'serviceChargeAmount', value: serviceChargeAmount },
      { key: 'familyRate', value: familyRate },
      { key: 'coupleRate', value: coupleRate },
      { key: 'individualRate', value: individualRate },
    ]

    if (!isNew) {
      requiredNumberFields.forEach(({ key, value }) => {
        if (value === undefined || value === null) {
          ctx.addIssue({
            path: [key],
            message: 'Required',
            code: z.ZodIssueCode.custom,
          })
        }
      })

      rateFields.forEach(({ key, value }) => {
        if (value === undefined || value === null) {
          ctx.addIssue({
            path: [key],
            message: 'Required',
            code: z.ZodIssueCode.custom,
          })
        }
      })
    }

    if (data.isMailingAddressSameAsPrimary === 'no') {
      const billingAddresses = contactDetails.addresses.filter(
        (addr) => addr.type.toLowerCase() === 'billing',
      )

      if (billingAddresses.length === 0) {
        ctx.addIssue({
          path: ['contactDetails.addresses'],
          message: 'Billing address is required when not same as primary',
          code: z.ZodIssueCode.custom,
        })
      } else {
        const billingAddress = billingAddresses[0]
        const fields = ['street1', 'city', 'state', 'postalCode'] as const
        fields.forEach((field) => {
          if (
            !billingAddress[field] ||
            billingAddress[field].trim().length < 1
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
