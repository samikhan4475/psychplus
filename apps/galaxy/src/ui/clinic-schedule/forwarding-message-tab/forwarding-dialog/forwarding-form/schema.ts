import { DateValue } from 'react-aria-components'
import z from 'zod'

const forwardingSchema = z.object({
  userId: z.number(),
  messageForwardingRecipients: z
    .array(z.string())
    .min(1, 'At least one recipient must be selected'),

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
  durationInDays: z
    .number()
    .refine((val) => val > 0, { message: 'Must be greater than 0' }),
  fromTime: z.string().trim().min(1, 'Required'),
  toTime: z.string().trim().min(1, 'Required'),
  recordStatus: z.ostring(),
})

type ForwardingSchemaType = z.infer<typeof forwardingSchema>

export { forwardingSchema, type ForwardingSchemaType }
