import { DateValue, TimeValue } from 'react-aria-components'
import z from 'zod'

const service = z.object({
  service: z.string(),
  bookingFrequency: z.string(),
})

const group = z.object({
  group: z.string(),
})

const telestate = z.object({
  name: z.string(),
  location: z.string(),
  cosigner: z.string(),
})

const schema = z.object({
  primaryState: z.string(),
  primaryLocation: z.string(),
  primaryStateCosigner: z.string(),
  day: z.string(),
  recurrence: z.string(),
  timeStart: z.custom<TimeValue>().refine((val) => val !== undefined, {
    message: 'Required',
  }),
  timeEnd: z.custom<TimeValue>(),
  dateStart: z.custom<DateValue>().refine((val) => val !== undefined, {
    message: 'Required',
  }),
  dateEnd: z.custom<DateValue>(),
  visitMedium: z.string(),
  bookingFrequency: z.string(),
  status: z.string(),
  publicView: z.string(),
  services: z.array(service),
  groups: z.array(group),
  telestates: z.array(telestate),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
