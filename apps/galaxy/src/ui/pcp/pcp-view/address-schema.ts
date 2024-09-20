import z from 'zod'
import { zipCodeSchema } from '@/utils'

const addressSchema = z
  .object({
    physicianName: z.string().optional(),
    physicianCredentials: z.string().min(1, 'Required'),
    physicianPhone: z.string().trim().length(10, 'Invalid phone number'),
    physicianNpi: z.string().trim().length(10, 'Invalid npi number'),
    physicianEmail: z.string().trim().email(),
    physicianFax: z.string().length(10, 'Invalid fax number'),
    primaryStreet1: z.string().min(1, 'Required'),
    primaryStreet2: z.string().optional(),
    primaryCity: z.string().min(1, 'Required'),
    primaryState: z.string().min(1, 'Required'),
    primaryPostalCode: zipCodeSchema,
    primaryCountry: z.string().optional(),
    isMailingAddressSameAsHome: z.enum(['yes', 'no']),
    secondaryStreet1: z.string().optional(),
    secondaryStreet2: z.string().optional(),
    secondaryStreet: z.string().optional(),
    secondaryStreetNumber: z.string().optional(),
    secondaryCity: z.string().optional(),
    secondaryState: z.string().optional(),
    secondaryPostalCode: z.string().trim().optional(),
    secondaryCountry: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isMailingAddressSameAsHome) {
      if (!data.secondaryStreet1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['secondaryStreet1'],
        })
      }

      if (!data.secondaryCity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['secondaryCity'],
        })
      }
      if (!data.secondaryState) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['secondaryState'],
        })
      }
      if (!data.secondaryPostalCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['secondaryPostalCode'],
        })
      }
    }
  })

type AddressSchemaType = z.infer<typeof addressSchema>

export { addressSchema, type AddressSchemaType }
