import { z } from 'zod'

type pharmacySchemaType = z.infer<typeof pharmacySchema>

const pharmacySchema = z.object({
  pharmacyName: z.string().min(1, { message: "required" }),
  pharmacyAddress: z.string().min(1, { message: "required" }),
  city: z.string().min(1, { message: "required" }),
  state: z.string().min(1, { message: "required" }),
  pharmacyZipCode: z.string().min(1, { message: "required" }),
  pharmacyNumber: z.string().min(1, { message: "required" }),
})

export { pharmacySchema, type pharmacySchemaType }
