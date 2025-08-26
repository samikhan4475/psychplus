import { DateValue } from 'react-aria-components'
import z from 'zod'

const labresultSchema = z.object({
  labTestNamePartial: z.string(),
  dateFrom: z.custom<null | DateValue>(),
  dateTo: z.custom<null | DateValue>(),
})

type LabResultSchemaType = z.infer<typeof labresultSchema>

export { labresultSchema, type LabResultSchemaType }
