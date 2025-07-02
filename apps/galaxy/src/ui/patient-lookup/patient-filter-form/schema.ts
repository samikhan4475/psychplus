import { DateValue } from 'react-aria-components'
import z from 'zod'
import { zipLast4Schema } from '@/utils'
import { INVALID_RANGE_ERROR } from '../constants'
import { validateDate } from '../utils'

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const patientLookupSchema = z
  .object({
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
    age: z
      .string()
      .max(3, { message: 'Cannot exceed 3 characters' })
      .optional(),
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
    postalPlus4Code: zipLast4Schema,
    hasGuardian: z.string().trim().optional(),
    telephone: z.string().trim().optional(),
    consentVerificationStatuses: z.array(z.string()).optional(),
    creditCardVerificationStatuses: z.array(z.string()).optional(),
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
    nextVisitStatus: z.string().optional(),
    pastVisitStatus: z.string().optional(),
    contactMadeStatuses: z.string().trim().optional(),
    insurancePolicyIds: z.array(z.string()).optional(),
    organizations: z.array(z.string()).optional(),
    stateCode: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    const { patientCreatedFrom, patientCreatedTo } = data
    const isStartDateValid = patientCreatedFrom
      ? validateDate(patientCreatedFrom, patientCreatedTo)
      : 0
    const isEndDateValid = patientCreatedTo
      ? validateDate(patientCreatedTo, patientCreatedFrom)
      : 0
    if (isStartDateValid > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_RANGE_ERROR,
        path: ['patientCreatedFrom'],
      })
    }

    if (isEndDateValid < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_RANGE_ERROR,
        path: ['patientCreatedTo'],
      })
    }
  })

type PatientLookUpSchemaType = z.infer<typeof patientLookupSchema>

export { patientLookupSchema, type PatientLookUpSchemaType }
