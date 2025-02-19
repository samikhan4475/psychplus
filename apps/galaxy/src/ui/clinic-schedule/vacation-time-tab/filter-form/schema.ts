import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  fromDate: z.custom<null | DateValue>().optional(),
  toDate: z.custom<null | DateValue>().optional(),
  status: z.string().optional(),
})

type VacationTimeSchemaType = z.infer<typeof schema>
export { schema, type VacationTimeSchemaType }
