import { DateValue, TimeValue } from 'react-aria-components'
import z from 'zod'

const dateValidation = z.custom<DateValue>()

export const schema = z.object({
  patientId: z.string().optional(),
  fromDate: dateValidation.optional(),
  toDate: dateValidation.optional(),
  visitId: z.string().optional(),
  facilityAdmissionId: z.string().optional(),
  visitTypeCode: z.string().optional(),
  locationId: z.string().optional(),
  visitStatuses: z.string().optional(),
  admittingProviderName: z.string().optional(),
  admissionDateTime: dateValidation.optional(),
  admitTime: z.custom<TimeValue>(),
  dischargeVisitSequenceDate: dateValidation.optional(),
  dateOfService: dateValidation.optional(),
  serviceId: z.string().optional(),
  providerType: z.string().optional(),
  providerStaffId: z.string().optional(),
  cosignerUserId: z.string().optional(),
  dischargeHospitalName: z.string().trim().optional(),
  dischargeHospitalDate: dateValidation.optional(),
  residingStateCode: z.string().optional(),
  primaryInsurancePolicyId: z.string().optional(),
  secondaryInsurancePolicyId: z.string().optional(),
  coPayDue: z.string().optional(),
  coPayPaid: z.string().optional(),
  coInsDue: z.string().optional(),
  coInsPaid: z.string().optional(),
  balanceDue: z.string().optional(),
  balancePaid: z.string().optional(),
})

export type SchedulingHistorySchemaType = z.infer<typeof schema>
