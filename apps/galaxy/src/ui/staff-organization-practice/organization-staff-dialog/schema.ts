import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  organizationId: z.string().optional(),
  practice: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
