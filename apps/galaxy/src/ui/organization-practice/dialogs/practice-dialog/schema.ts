import z from 'zod'

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  npi: z.string().min(1, { message: 'NPI is required' }),
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
  payer: z.object({
    street1: z.string().min(1, { message: 'Address is required' }),
    street2: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().min(1, { message: 'Zip is required' }),
  }),
  recordStatus: z.string().optional(),
  sameAsOrganizationAddress: z.boolean().optional().default(true),
  sameAsPrimaryAddress: z.boolean().optional().default(true),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
