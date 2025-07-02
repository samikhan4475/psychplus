import { zipCodeSchema, zipLast4Schema } from '@psychplus-v2/utils'
import z from 'zod'

const addressSchema = z
  .object({
    primaryStreet1: z.string().min(1, 'Required'),
    primaryStreet2: z.string().optional(),
    primaryStreet: z.string().optional(),
    primaryStreetNumber: z.string().optional(),
    primaryCity: z.string().min(1, 'Required'),
    primaryState: z.string().min(1, 'Required'),
    primaryPostalCode: zipCodeSchema,
    primaryPostalPlus4Code: zipLast4Schema,
    primaryCountry: z.string().optional(),
    isMailingAddressSameAsPrimary: z.boolean(),
    secondaryStreet1: z.string().optional(),
    secondaryStreet2: z.string().optional(),
    secondaryStreet: z.string().optional(),
    secondaryStreetNumber: z.string().optional(),
    secondaryCity: z.string().optional(),
    secondaryState: z.string().optional(),
    secondaryPostalCode: z.string().trim().optional(),
    secondaryPostalPlus4Code: zipLast4Schema,
    secondaryCountry: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isMailingAddressSameAsPrimary) {
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
