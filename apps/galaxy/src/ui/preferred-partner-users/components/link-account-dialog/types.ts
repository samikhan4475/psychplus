import { DateValue } from 'react-aria-components'
import { z } from 'zod'

export const linkAccountSchema = z.object({
  mrn: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.custom<null | DateValue>().optional(),
})

export type LinkAccountSchemaType = z.infer<typeof linkAccountSchema>
