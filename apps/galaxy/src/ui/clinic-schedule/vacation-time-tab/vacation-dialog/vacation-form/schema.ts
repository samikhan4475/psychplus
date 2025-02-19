import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  id: z.onumber(),
  staffId: z.number(),
  startDateTime: z
    .custom<DateValue>()
    .refine((val) => val !== null && val !== undefined, {
      message: 'Required',
    }),
  endDateTime: z
    .custom<DateValue>()
    .refine((val) => val !== null && val !== undefined, {
      message: 'Required',
    }),
  fromTime: z.string().trim().min(1, 'Required'),
  toTime: z.string().trim().min(1, 'Required'),
  duration: z.number(),
  vacationStatus: z.string().min(1, 'Required'),
})

type VacationSchemaType = z.infer<typeof schema>
export { schema, type VacationSchemaType }
