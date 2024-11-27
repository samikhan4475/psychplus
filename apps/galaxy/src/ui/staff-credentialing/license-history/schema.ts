import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  fromDate: z
    .custom<DateValue>()
    .refine((val) => val !== null && val !== undefined, {
      message: 'Required',
    }),
  fromTime: z.string().trim().min(1, 'Required'),
  toDate: z
    .custom<DateValue>()
    .refine((val) => val !== null && val !== undefined, {
      message: 'Required',
    }),
  toTime: z.string().trim().min(1, 'Required'),
  duration: z.number(),
  vacationStatus: z.string().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
