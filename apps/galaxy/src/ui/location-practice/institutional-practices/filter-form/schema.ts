import { z } from 'zod'

const LocationFormSchema = z.object({
  locationNameGenerated: z.string().optional(),
  locationType: z.string().optional(),
  locationName: z.string().optional(),
  zip: z.string().optional(),
  npi: z.string().max(10, 'Max 10 characters').optional(),
  recordStatuses: z.string().optional(),
  Phone: z.string().optional(),
  stateCode: z.string().optional(),
  isGoogleLinkStatus: z.string().optional(),
})

type LocationFormSchemaType = z.infer<typeof LocationFormSchema>

export { LocationFormSchema, type LocationFormSchemaType }
