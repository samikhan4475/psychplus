import { DateValue } from 'react-aria-components'
import z from 'zod'

const forwardingMessageFilterSchema = z.object({
  fromDate: z.custom<null | DateValue>().optional(),
  toDate: z.custom<null | DateValue>().optional(),
  forwardingId: z.ostring(),
  recordStatus: z.ostring(),
})
type ForwardingMessageFilterSchemaType = z.infer<
  typeof forwardingMessageFilterSchema
>

export { forwardingMessageFilterSchema, type ForwardingMessageFilterSchemaType }
