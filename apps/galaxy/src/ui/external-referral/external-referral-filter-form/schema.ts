import { DateValue } from 'react-aria-components'
import z from 'zod'
import { INVALID_RANGE_ERROR } from '../constants'
import { validateDate } from '../utils'

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const patientLookupSchema = z
  .object({
    patientPartialFirstName: z
      .string()
      .trim()
      .max(35, { message: 'Cannot exceed 35 characters' })
      .optional(),
    patientPartialLastName: z
      .string()
      .trim()
      .max(35, { message: 'Cannot exceed 35 characters' })
      .optional(),
    patientEmail: z.union([z.literal(''), z.string().email()]).optional(),
    patientAge: z
      .string()
      .max(3, { message: 'Cannot exceed 3 characters' })
      .optional(),
    patientGender: z.string().trim().optional(),
    name: z
      .string()
      .trim()
      .max(35, { message: 'Cannot exceed 35 characters' })
      .optional(),
    patientExternalMrn: z
      .string()
      .trim()
      .max(35, { message: 'Cannot exceed 35 characters' })
      .optional(),
    patientDateOfBirth: z.custom<null | DateValue>().optional(),
    patientCity: z
      .string()
      .trim()
      .max(35, { message: 'Cannot exceed 35 characters' })
      .optional(),
    patientPostalCode: z
      .string()
      .trim()
      .regex(zipCodeRegex, 'Invalid zip code!')
      .optional(),
    hasGuardian: z.string().trim().optional(),
    creditCardVerificationStatuses: z.array(z.string()).optional(),
    consentVerificationStatuses: z.array(z.string()).optional(),
    patientPhoneNumber: z.string().trim().optional(),
    patientCreatedFrom: z.custom<null | DateValue>().optional(),
    patientCreatedTo: z.custom<null | DateValue>().optional(),
    ssn: z
      .string()
      .trim()
      .max(35, { message: 'Cannot exceed 35 characters' })
      .optional(),
    verificationStatuses: z.array(z.string()).optional(),
    patientStatuses: z.array(z.string()).optional(),
    insuranceVerificationStatuses: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    nextVisitStatus: z.string().optional(),
    pastVisitStatus: z.string().optional(),
    organizationType: z.string().optional(),
    referrerPartialName: z.string().optional(),
    referrerShortName: z.string().optional(),
    contactMadeStatusList: z.string().trim().optional(),
    insurancePolicyIds: z.array(z.string()).optional(),
    patientStateCode: z.string().trim().optional(),
    isPatientLinked: z.string().optional(),
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

type ExternalReferralSchemaType = z.infer<typeof patientLookupSchema>

export { patientLookupSchema, type ExternalReferralSchemaType }
