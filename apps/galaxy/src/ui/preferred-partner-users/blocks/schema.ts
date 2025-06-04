import { DateValue } from 'react-aria-components'
import { z } from 'zod'

export const preferredPartnerFiltersSchema = z.object({
  userName: z.string().optional(),
  mrn: z.string().optional(),
  dateFrom: z.custom<null | DateValue>().optional(),
  dateTo: z.custom<null | DateValue>().optional(),
  userStatus: z.string().optional(),
})

export type PreferredPartnerFiltersSchemaType = z.infer<
  typeof preferredPartnerFiltersSchema
>
