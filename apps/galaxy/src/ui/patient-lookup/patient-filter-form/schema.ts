import { DateValue } from 'react-aria-components'
import z from 'zod'

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const phoneRegex = /^(\+?[1-9]\d{9}|^$)$/
const patientLookupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  lastName: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  email: z.union([z.literal(''), z.string().email()]).optional(),
  age: z.string().max(3, { message: 'Cannot exceed 3 characters' }).optional(),
  gender: z.string().trim().optional(),
  name: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  mrn: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  dateOfBirth: z.custom<null | DateValue>().optional(),
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
  hasGuardian: z.string().trim().optional(),
  telephone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Invalid phone number')
    .optional(),
  consentVerificationStatus: z.string().trim().optional(),
  creditCardVerificationStatus: z.string().trim().optional(),
  patientCreatedFrom: z.custom<null | DateValue>().optional(),
  patientCreatedTo: z.custom<null | DateValue>().optional(),
  ssn: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  verificationStatuses: z.array(z.string()).optional(),
  patientStatuses: z.array(z.string()).optional(),
  practices: z.array(z.string()).optional(),
  insuranceVerificationStatuses: z.array(z.string()).optional(),
  visitHistoryPastDays: z.string().optional(),
  futureVisitsByDays: z.string().optional(),
  futureVisitsStatus: z.string().optional(),
  visitHistoryPastStatus: z.string().optional(),
  contactMadeStatuses: z.string().trim().optional(),
  insurancePolicyIds: z.array(z.string()).optional(),
  organizations: z.array(z.string()).optional(),
})

type PatientLookUpSchemaType = z.infer<typeof patientLookupSchema>

export { patientLookupSchema, type PatientLookUpSchemaType }
