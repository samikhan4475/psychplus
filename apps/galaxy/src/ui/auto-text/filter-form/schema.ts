import z from 'zod'

const schema = z.object({
  search: z.ostring(),
})

type AutoTextFilterSchemaType = z.infer<typeof schema>

export { schema, type AutoTextFilterSchemaType }
