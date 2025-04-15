import { z } from 'zod'

const schema = z.object({
  serviceLevelTypes: z.array(z.string()).min(1, 'At least one service level is required.'),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }