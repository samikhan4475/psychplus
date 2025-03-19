import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  endDate: z.custom<DateValue>().optional(),
  licenseNumber: z.string().optional(),
  providerStaffId: z.string().optional(),
  startDate: z.custom<DateValue>().optional(),
  state: z.string().optional(),
  status: z.string().optional(),
  isAlert: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
