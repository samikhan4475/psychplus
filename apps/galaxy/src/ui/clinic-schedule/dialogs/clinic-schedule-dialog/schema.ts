import { DateValue, TimeValue } from 'react-aria-components'
import z from 'zod'

const telestate = z.object({
  stateCode: z.string(),
  stateId: z.string(),
  stateName: z.ostring(),
  location: z.string(),
  cosignerStaffId: z.onumber(),
})

const visit = z.object({
  serviceVisitTypeId: z.string(),
  visitName: z.ostring(),
})

const schema = z.object({
  primaryState: z.string(),
  primaryLocation: z.string(),
  timeZoneId: z.ostring(),
  primaryLocationName: z.string(),
  cosignerStaffId: z.ostring(),
  cosignerName: z.ostring(),
  day: z.string(),
  recurrence: z.string(),
  timeStart: z.custom<TimeValue>().refine((val) => val !== undefined, {
    message: 'Required',
  }),
  dateStart: z.custom<DateValue>().refine((val) => val !== undefined, {
    message: 'Required',
  }),
  timeEnd: z.custom<TimeValue>().optional(),
  dateEnd: z.custom<DateValue>().optional(),
  visitMedium: z.string(),
  status: z.string(),
  publicView: z.string(),
  teleStates: z
    .array(telestate)
    .refine(
      (teleStates) =>
        teleStates.length === 0 ||
        teleStates.every(
          (state) => state.stateCode && state.stateId && state.location,
        ),
      {
        message:
          'All teleStates fields are required if teleStates length is greater than zero',
      },
    ),
  groups: z
    .array(z.string())
    .min(1, { message: 'Please select at least one group' }),
  serviceId: z.string(),
  serviceOffered: z.string(),
  maxBookingsPerSlot: z.number(),
  therapyTypeCode: z.ostring(),
  bookingFrequency: z.string(),
  visitTypes: z
    .array(visit)
    .min(1, { message: 'Please select at least one visit.' }),
})

type SchemaType = z.infer<typeof schema>
type telestateType = z.infer<typeof telestate>
type visitType = z.infer<typeof visit>

export { schema, type SchemaType, type telestateType, type visitType }
