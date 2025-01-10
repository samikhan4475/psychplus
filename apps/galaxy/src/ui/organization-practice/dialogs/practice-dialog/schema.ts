import z, { record } from 'zod'

const schema = z.object({
  name: z.string().optional(),
  npi: z.string().optional(),
  tin: z.string().optional(),
  taxonomyCode: z.string().optional(),
  clia: z.string().optional(),
  organizationId: z.string().optional(),
  phoneNumber: z.string().optional(),
  fax: z.string().optional(),
  defProvider: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  isPrimaryAddressSameAsOrganization: z.string().optional().default('no'),
  isPayerAddressSameAsPrimary: z.string().optional().default('no'),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
