import { DateValue } from 'react-aria-components'
import z from 'zod'

const patientReferralsSchema = z.object({
  servicesOfferedList: z.array(z.string()),
  contactStatusList: z.array(z.string()),
  resourceStatusList: z.array(z.string()),
  fromReferralDate: z.custom<null | DateValue>(),
  toReferralDate: z.custom<null | DateValue>(),
})

type PatientReferralsSchemaType = z.infer<typeof patientReferralsSchema>

export { patientReferralsSchema, type PatientReferralsSchemaType }
