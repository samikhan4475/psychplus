import { z } from 'zod'

const serviceFiltersSchema = z.object({
  locationType: z.string().optional(),
  locationName: z.string().optional(),
  serviceOffered: z.string().optional(),
  servicePlace: z.string().optional(),
  providerType: z.string().optional(),
  coSignerType: z.string().optional(),
  cosignerId: z.string().optional(),
  maxBookingFrequency: z.string().optional(),
  visitTypeName: z.string().optional(),
  address: z.string().optional(),
  recordStatus: z.string().optional(),
  taxonomy: z.string().optional(),
  maxBookingFrequencyInSlot: z.ostring(),
})

type ServiceFiltersSchemaType = z.infer<typeof serviceFiltersSchema>

export { serviceFiltersSchema, type ServiceFiltersSchemaType }
