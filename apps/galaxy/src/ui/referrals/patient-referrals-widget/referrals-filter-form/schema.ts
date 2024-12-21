import { DateValue } from 'react-aria-components'
import z from 'zod'

const patientReferralsSchema = z.object({
  servicesOfferedList: z.array(z.string()),
  contactStatusList: z.array(z.string()),
  resourceStatusList: z.array(z.string()),
  fromServiceDate: z.custom<null | DateValue>(),
  toServiceDate: z.custom<null | DateValue>(),
  serviceStatusList: z.array(z.string()),
  providerIds: z.array(z.string()),
  initiatedByRole: z.array(z.string()),
  visitHx: z.string().optional(),
  nextVisit: z.string().optional(),
})

type PatientReferralsSchemaType = z.infer<typeof patientReferralsSchema>

export { patientReferralsSchema, type PatientReferralsSchemaType }
