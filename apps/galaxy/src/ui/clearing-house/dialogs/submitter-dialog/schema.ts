import z from 'zod'
import { zipLast4Schema } from '@/utils'

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  username: z.string().min(1, { message: 'User name is required' }),
  password: z.string().min(1, { message: 'User Password is required' }),
  submitterId: z.string().min(1, { message: 'Submitter is required' }),
  contactPerson: z.string().optional(),
  practiceId: z.string().min(1, { message: 'Practice name is required' }),
  receiverId: z.string().min(1, { message: 'Receiver is required' }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().min(1, { message: 'User email is required' }),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  postalPlus4Code: zipLast4Schema,
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
