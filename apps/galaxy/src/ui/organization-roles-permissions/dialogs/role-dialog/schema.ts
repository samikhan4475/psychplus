import z from 'zod'

const schema = z.object({
  shortName: z.string().min(1, { message: 'Title is required' }),
  recordStatus: z.string().optional(),
  displayName: z.string().min(1, { message: 'Display name is required' }),
  actorCategory: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
