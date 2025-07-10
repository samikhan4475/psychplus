import z from 'zod'

const geoCoordinatesSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  altitude: z.number(),
})

const addressSchema = z.object({
  type: z.string().min(1, { message: 'Address type is required' }),
  street1: z.string().min(1, { message: 'Street 1 is required' }),
  street2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  postalCode: z.string().min(1, { message: 'Postal code is required' }),
  postalPlus4Code: z.string().optional(),
  geoCoordinates: geoCoordinatesSchema.optional(),
  timeZoneId: z.string(),
})
const schema = z.object({
  id: z.string().optional(),
  recordStatus: z.string().min(1, { message: 'Record Status is Required' }),
  address: addressSchema,
  cityId: z.string(),
  stateId: z.string(),
  isDefaultLocation: z.boolean(),
})
type SchemaType = z.infer<typeof schema>
export { schema, type SchemaType }
