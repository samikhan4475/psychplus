import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  deaData: z.array(
    z.object({
      state: z.string().min(1),
      status: z.string().min(1),
      license: z.string().min(1),
      startDate: z
        .custom<DateValue>()
        .refine((val) => val !== null && val !== undefined, {
          message: 'Required',
        }),
      endDate: z
        .custom<DateValue>()
        .refine((val) => val !== null && val !== undefined, {
          message: 'Required',
        }),
      alert: z.boolean(),
    }),
  ),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
