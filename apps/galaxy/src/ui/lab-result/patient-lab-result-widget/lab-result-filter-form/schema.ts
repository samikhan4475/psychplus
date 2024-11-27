import { DateValue } from 'react-aria-components'
import z from 'zod'

const labresultSchema = z.object({
  resourceStatus: z.string(),
  fromReferralDate: z.custom<null | DateValue>(),
  toReferralDate: z.custom<null | DateValue>(),
})

type LabResultSchemaType = z.infer<typeof labresultSchema>

export { labresultSchema, type LabResultSchemaType }
