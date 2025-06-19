import { DateValue } from 'react-aria-components'
import { z } from 'zod'

export const preferredPartnerWorklistFiltersSchema = z.object({
  userName: z.string().optional(),
  ssn: z.string().optional(),
  dateFrom: z.custom<null | DateValue>().optional(),
  dateTo: z.custom<null | DateValue>().optional(),
  userStatus: z.string().optional(),
})

export type PreferredPartnerWorklistFiltersSchemaType = z.infer<
  typeof preferredPartnerWorklistFiltersSchema
>
