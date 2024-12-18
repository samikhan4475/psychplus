import z from 'zod'

const schema = z.object({
  firstname: z.string().min(1, { message: 'First name is required' }),
  lastname: z.string().min(1, { message: 'Last name is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  individualNpi: z.string().min(1, { message: 'Individual NPI is required' }),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  practice: z.string().min(1, { message: 'Practice is required' }),
  organization: z.string().min(1, { message: 'Organization is required' }),
  language: z.string().min(1, { message: 'Language is required' }),
  isMailingAddressSameAsHome: z.string().optional().default('no'),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
