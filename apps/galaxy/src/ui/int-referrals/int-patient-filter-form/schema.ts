import { DateValue } from 'react-aria-components'
import z from 'zod'

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const phoneRegex = /^(\+?[1-9]\d{9}|^$)$/
const patientLookupSchema = z.object({
  name: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  patientStatuses: z.array(z.string()).optional(),
  age: z.string().max(3, { message: 'Cannot exceed 3 characters' }).optional(),
  gender: z.string().trim().optional(),
  mrn: z
    .string()
    .trim()
    .regex(/^\d*$/, 'Must contain only numbers')
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  dateOfBirth: z.custom<null | DateValue>().optional(),
  telephone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Invalid phone number')
    .optional(),
  email: z.union([z.literal(''), z.string().email()]).optional(),
  stateOfResidenceCode: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  city: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  postalCode: z
    .string()
    .trim()
    .regex(zipCodeRegex, 'Invalid zip code!')
    .optional(),
  primaryInsurancePolicyIds: z.array(z.string()).optional(),
  secondaryInsurancePolicyIds: z.array(z.string()).optional(),
  servicesOfferedList: z.array(z.string()).optional(),
  fromReferralDate: z.custom<null | DateValue>().optional(),
  toReferralDate: z.custom<null | DateValue>().optional(),
  appointmentId: z
    .string()
    .trim()
    .regex(/^\d*$/, 'Must contain only numbers')
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  serviceStatuses: z.array(z.string()).optional(),
  initiatedByRoles: z.array(z.string()).optional(),
  providerNames: z.array(z.string()).optional(),
  practiceId: z.array(z.string()).optional(),
  organizationId: z.array(z.string()).optional(),
  contactStatusList: z.array(z.string()).optional(),
  resourceStatusList: z.array(z.string()).optional(),
  nextVisit: z.string().trim().optional(),
  visitHx: z.string().trim().optional(),
})

type IntReferralsPatientLookUpSchemaType = z.infer<typeof patientLookupSchema>

export { patientLookupSchema, type IntReferralsPatientLookUpSchemaType }
