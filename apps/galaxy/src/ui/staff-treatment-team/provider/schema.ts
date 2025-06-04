import z from 'zod'

export const providerSchema = z.object({
  providerId: z.string().min(1, 'Provider is required'),
  providerType: z.string(),
  isPrimary: z.boolean(),
  selectedRows: z.array(z.string()).min(1, 'At least one patient is required'),
  isPopupOpen: z.boolean().optional(),
})

export type ProviderSchemaType = z.infer<typeof providerSchema>
