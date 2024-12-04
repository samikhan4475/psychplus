import z from 'zod'

const addPayerPlanSchema = z.object({
  id: z.string().optional(),
  payerId: z.string(),
  payerType: z.string(),
  name: z.string().min(1, "Required"),
  payerStatus: z.string(),
  payerName: z.string().optional(),
  isTest: z.boolean().optional(),
  isPublicViewable: z.boolean().optional(),
  providerPortalUrl: z.string().optional(),
  claimProcessingPhoneNumber: z.string().optional(),
  credentialOrContractingPhoneNumber: z.string().optional(),
  networkRepresentativeName: z.string().optional(),
  claimProcessingFaxNumber: z.string().optional(),
  credentialOrContractingEmail: z.union([z.literal(''), z.string().email("Invalid email format")]).optional(),
  networkRepresentativeEmail: z.union([z.literal(''), z.string().email("Invalid email format")]).optional(),
  isActive: z.boolean().optional(),
})

const updatePayerPlanSchema = z.object({
  id: z.string(),
  payerId: z.string(),
  payerType: z.string(),
  name: z.string().min(1, "Required"),
  payerStatus: z.string(),
  payerName: z.string().optional(),
  isTest: z.boolean().optional(),
  isPublicViewable: z.boolean().optional(),
  providerPortalUrl: z.string().optional(),
  claimProcessingPhoneNumber: z.string().optional(),
  credentialOrContractingPhoneNumber: z.string().optional(),
  networkRepresentativeName: z.string().optional(),
  claimProcessingFaxNumber: z.string().optional(),
  credentialOrContractingEmail: z.union([z.literal(''), z.string().email("Invalid email format")]).optional(),
  networkRepresentativeEmail: z.union([z.literal(''), z.string().email("Invalid email format")]).optional(),
  isActive: z.boolean().optional(),
})

type SchemaType = z.infer<typeof addPayerPlanSchema>
type UpdatePayerPlanSchemaType = z.infer<typeof updatePayerPlanSchema>

export {
  addPayerPlanSchema,
  updatePayerPlanSchema,
  type SchemaType,
  type UpdatePayerPlanSchemaType,
}
