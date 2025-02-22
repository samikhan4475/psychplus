import { z } from 'zod'

const serviceFiltersSchema = z.object({
  id: z.string().optional(),
  locationType: z.string().optional(),
  locationName: z.string().optional(),
  service: z.string().optional(),
  pos: z.string().optional(),
  primaryProvider: z.string().optional(),
  coSignerType: z.string().optional(),
  coSigner: z.string().optional(),
  maxBookingFrequency: z.string().optional(),
  visitType: z.string().optional(),
  address: z.string().optional(),
  recordStatuses: z.string().optional(),
  taxonomy: z.string().optional(),
})

type ServiceFiltersSchemaType = z.infer<typeof serviceFiltersSchema>

export { serviceFiltersSchema, type ServiceFiltersSchemaType }
