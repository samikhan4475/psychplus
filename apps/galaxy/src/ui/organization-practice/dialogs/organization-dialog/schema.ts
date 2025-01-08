import z, { record } from 'zod'

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  contactName: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  phone: z.string().optional(),
  email: z.string().optional(),
  recordStatus: z.string().min(1, { message: 'Status is required' }),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
