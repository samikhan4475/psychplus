import z, { record } from 'zod'
import { zipLast4Schema } from '@/utils'

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  contactName: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(5, { message: 'Valid zip is required' }),
  postalPlus4Code: zipLast4Schema,
  contactPhone: z.string().optional(),
  contactEmail: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  recordStatus: z.string().min(1, { message: 'Status is required' }),
  ehrPartner: z.boolean().optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
