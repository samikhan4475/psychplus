import z from 'zod'

const schema = z.object({
  providerIds: z.array(z.number()),
  serviceId: z.ostring(),
  name: z.ostring(),
  gender: z.ostring(),
  age: z.ostring(),
  visitType: z.ostring(),
  appointmentStatus: z.ostring(),
  locationId: z.ostring(),
  startingDate: z.ostring(),
  endingDate: z.ostring(),
})

type ActiveVisitSchemaType = z.infer<typeof schema>
export { schema, type ActiveVisitSchemaType }
