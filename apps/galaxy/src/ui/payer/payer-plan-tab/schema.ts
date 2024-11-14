import z from 'zod'

const payerPlanSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  isTest: z.boolean(),
  isPublicViewable: z.boolean(),
  payerType: z.string(),
  payerName: z.string(),
  payerStatus: z.string(),
  providerPortalUrl: z.string().optional(),
  claimProcessingPhoneNumber: z.string().optional(),
  credentialOrContractingPhoneNumber: z.string().optional(),
  networkRepresentativeName: z.string().optional(),
  claimProcessingFaxNumber: z.string().optional(),
  credentialOrContractingEmail: z.string().optional(),
  networkRepresentativeEmail: z.string().optional(),
})

type SchemaType = z.infer<typeof payerPlanSchema>

export { payerPlanSchema, type SchemaType }
