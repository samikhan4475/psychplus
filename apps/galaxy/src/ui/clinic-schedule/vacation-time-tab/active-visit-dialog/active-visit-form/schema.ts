import z from 'zod'

const schema = z.object({
  name: z.string().optional(),
  gender: z.string().optional(),
  age: z.string().optional(),
  visitService: z.string().optional(),
  visitType: z.string().optional(),
  status: z.string().optional(),
  location: z.string().optional(),
})

type ActiveVisitSchemaType = z.infer<typeof schema>
export { schema, type ActiveVisitSchemaType }
