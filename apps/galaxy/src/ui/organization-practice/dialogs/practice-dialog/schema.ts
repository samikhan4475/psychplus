import z from 'zod'

const schema = z.object({
  displayName: z.string().min(1, { message: 'Name is required' }),
  npi: z.string().min(1, { message: 'NPI is required' }),
  taxId: z.string().optional(),
  taxonomy: z.string().optional(),
  id: z.string().optional(),
  clia: z.string().optional(),
  organizationId: z.string().optional(),
  practicePhone: z.string().optional(),
  practiceFax: z.string().optional(),
  defaultProviderStaffId: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  zipLast4: z.string().max(4, { message: 'Invalid area code!' }).optional(),
  practiceAddressId: z.string().optional(),
  paymentAddressId: z.string().optional(),
  practicePaymentAddress: z.object({
    street1: z.string().min(1, { message: 'Address is required' }),
    street2: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().min(1, { message: 'Zip is required' }),
    zipLast4: z.string().max(4, { message: 'Invalid area code!' }).optional(),
  }),
  recordStatus: z.string().optional(),
  sameAsOrganizationAddress: z.boolean().optional().default(true),
  sameAsPrimaryAddress: z.boolean().optional().default(true),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
