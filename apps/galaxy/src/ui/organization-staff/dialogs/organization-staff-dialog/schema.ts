import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  middleName: z.string().optional(),
  credentials: z.string().optional(),
  password: z.string().min(1, { message: 'Password is required' }),
  npi: z.preprocess(
    (val) => (val !== '' ? Number(val) : undefined), // convert string to number
    z
      .number({ invalid_type_error: 'Enter a valid number' })
      .min(1, { message: 'NPI is required' }),
  ),
  providerAttributions: z.array(z.string()).optional(),
  staffRoleId: z.string().optional(),
  dateOfBirth: z.custom<DateValue>().optional(),
  virtualRoomLink: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  mailing: z.object({
    street1: z.string().min(1, { message: 'Address is required' }),
    street2: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().min(1, { message: 'Zip is required' }),
  }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  practiceIds: z.array(z.string()).min(1, { message: 'Practice is required' }),
  organizationIds: z
    .array(z.string())
    .min(1, { message: 'Organization is required' }),
  language: z.array(z.string()).min(1, { message: 'Minimum 1 is required' }),
  isMailingAddressSameAsHome: z.string().optional().default('no'),
  staffUserRoleIds: z.string().min(1, { message: 'Staff Role is required' }),
  staffType: z.string().min(1, { message: 'Staff Type is required' }),
  isTest: z.boolean(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
