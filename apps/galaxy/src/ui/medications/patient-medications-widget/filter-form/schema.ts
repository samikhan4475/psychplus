import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  writtenDate: z.custom<null | DateValue>().optional(),
  endDate: z.custom<null | DateValue>().optional(),
  drugName: z.string().optional(),
  pharmacyNcpdpId: z.string().optional(),
  medicationStatuses: z.string().optional(),
  recordStatuses: z.string().optional(),
  patientIds: z.array(z.number()).optional(),
  prescribingStaffId: z.string().optional(),
})
type PatientMedicationFilterSchemaType = z.infer<typeof schema>

export { schema, type PatientMedicationFilterSchemaType }
