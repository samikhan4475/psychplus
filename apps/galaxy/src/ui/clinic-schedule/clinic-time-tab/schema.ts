import z from 'zod'

const schema = z.object({
  primaryStateCode: z.ostring(),
  teleStateCode: z.ostring(),
  servicesOffered: z.ostring(),
  dayOfSchedule: z.ostring(),
  weeklyRecurrence: z.ostring(),
  maxBookingPerSlot: z.ostring(),
  visitMedium: z.ostring(),
  ageGroup: z.ostring(),
  cosignerStaffId: z.ostring(),
  isPublicViewable: z.ostring(),
  scheduleStatus: z.ostring(),
  visitType: z.ostring(),
})

type ClinicTimeFilterSchemaType = z.infer<typeof schema>

export { type ClinicTimeFilterSchemaType, schema }
