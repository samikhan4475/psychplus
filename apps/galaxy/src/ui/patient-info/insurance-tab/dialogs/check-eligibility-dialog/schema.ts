import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  patientId: z.string().min(1, 'Required'),
  patientInsurancePolicyId: z.string().min(1, 'Required'),
  organizationId: z.string().min(1, 'Required'),
  practiceId: z.string().min(1, 'Practice is required'),
  providerId: z.string(),
  locationId: z.string().min(1, 'Location is required'),
  serviceDate: z.custom<DateValue | null | undefined>(),
  serviceTypeCode: z.string().min(1, 'Required'),
  cptCodes: z.array(z.string().min(1, 'CPT code cannot be empty')).optional(),
  isService: z.string().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
