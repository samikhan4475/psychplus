import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  CreatedFrom: z.custom<null | DateValue>().optional(),
  CreatedTo: z.custom<null | DateValue>().optional(),
  recordStatus: z.string().optional(),
})

type VacationTimeSchemaType = z.infer<typeof schema>
export { schema, type VacationTimeSchemaType }
