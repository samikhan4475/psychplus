import z from 'zod'

export const pcpAddressTypeEnum = z.enum([
  'Home',
  'Business',
  'Mailing',
  'Billing',
])
const requiredString = z
  .string()
  .min(1, 'Required')
  .max(128, { message: 'Cannot exceed 128 characters' })

const optionalString = z
  .string()
  .max(128, { message: 'Cannot exceed 128 characters' })
  .optional()
  .default('')

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/

const zipCodeValidation = z
  .string()
  .regex(zipCodeRegex, 'Invalid zip code!')
  .min(1, 'Required')
  .default('')

const pcpSchema = z

  .object({
    id: z.string().optional(),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    credentials: z.string().min(1, 'Required'),
    phone: z.string().min(1, 'Required').length(10, 'Invalid phone number'),
    email: z.string().min(1, 'Required').email(),
    fax: z.string().min(1, 'Required').length(10, 'Invalid fax number'),
    isMailingAddressSameAsHome: z.enum(['yes', 'no']),
    officeAddress: z.object({
      type: pcpAddressTypeEnum.default('Home'),
      street1: requiredString,
      street2: optionalString,
      city: requiredString,
      state: requiredString,
      country: requiredString.default('US'),
      postalCode: zipCodeValidation,
    }),
    mailingAddress: z.object({
      type: pcpAddressTypeEnum.default('Home'),
      street1: optionalString,
      street2: optionalString,
      city: optionalString,
      state: optionalString,
      country: optionalString,
      postalCode: z
        .string()
        .regex(zipCodeRegex, 'Invalid zip code!')
        .optional()
        .default(''),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.isMailingAddressSameAsHome === 'no') {
      const mailingAddressFields: (keyof typeof data.mailingAddress)[] = [
        'street1',
        'city',
        'state',
        'postalCode',
      ]

      for (const field of mailingAddressFields) {
        if (!data.mailingAddress[field]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: [`mailingAddress.${field}`],
          })
        }
      }
    }
  })

type PcpSchemaType = z.infer<typeof pcpSchema>

export { pcpSchema, type PcpSchemaType }
