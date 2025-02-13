import z from 'zod'

export const pcpAddressTypeEnum = z.enum([
  'Home',
  'Business',
  'Mailing',
  'Billing',
])
const optionalString = z
  .string()
  .max(128, { message: 'Cannot exceed 128 characters' })
  .optional()
  .default('')

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/

const zipCodeValidation = z
  .string()
  .regex(zipCodeRegex, 'Invalid zip code!')
  .optional()
  .default('')

const pcpSchema = z

  .object({
    id: z.string().optional(),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    credentials: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    fax: z.string().optional(),
    isMailingAddressSameAsHome: z.enum(['yes', 'no']),
    officeAddress: z.object({
      type: pcpAddressTypeEnum.default('Home'),
      street1: optionalString,
      street2: optionalString,
      city: optionalString,
      state: optionalString,
      country: optionalString.default('US'),
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
    if (data.email && !emailRegex.test(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'email is not valid',
        path: [`email`],
      })
    }
  })

type PcpSchemaType = z.infer<typeof pcpSchema>

export { pcpSchema, type PcpSchemaType }
