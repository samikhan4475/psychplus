import { z } from 'zod'

type PharmacySchemaType = z.infer<typeof pharmacySchema>

const pharmacySchema = z.object({
  id: z.string(),
  pharmacyName: z.string().min(1, { message: 'Required' }),
  address: z.string().min(1, { message: 'Required' }),
  city: z.string().min(1, { message: 'Required' }),
  state: z.string().min(1, { message: 'Required' }),
  zipCode: z.string().min(1, { message: 'Required' }),
  phoneNumber: z.string().min(1, { message: 'Required' }),
})

export { pharmacySchema, type PharmacySchemaType }
