import { DateValue } from 'react-aria-components'
import z from 'zod'

const patientReferralsSchema = z.object({
  servicesOfferedList: z.array(z.string()),
  contactStatusList: z.array(z.string()),
  resourceStatusList: z.array(z.string()),
  fromReferralDate: z.custom<null | DateValue>(),
  toReferralDate: z.custom<null | DateValue>(),
  serviceStatuses: z.array(z.string()),
  providerNames: z.array(z.string()),
  initiatedByRole: z.array(z.string()),
  visitHx: z.string().optional(),
  nextVisit: z.string().optional(),
})

type PatientReferralsSchemaType = z.infer<typeof patientReferralsSchema>

export { patientReferralsSchema, type PatientReferralsSchemaType }
