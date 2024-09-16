import { parseDate } from '@internationalized/date'
import z from 'zod'
import { getAgeFromDate } from '@/utils'

const insuranceSchema = z
  .object({
    payerName: z.string().min(1, 'Required'),
    insurancePlanId: z.string().min(1, 'Required'),
    effectiveDate: z.string().min(1, 'Required'),
    terminationDate: z.string().min(1, 'Required'),
    memberId: z.string().trim().min(1, 'Required').max(16, 'Invalid Member ID'),
    groupNumber: z
      .string()
      .trim()
      .min(1, 'Required')
      .max(16, 'Invalid Gruop Number'),
    isPatientPolicyHolder: z.boolean(),
    policyHolderFirstName: z.string().max(28, 'Max 28 characters are allowed'),
    policyHolderLastName: z.string().max(28, 'Max 28 characters are allowed'),
    policyHolderGender: z.string().optional(),
    policyHolderRelationship: z.string().optional(),
    insurancePolicyPriority: z.string().min(1, 'Required'),
    policyHolderDateOfBirth: z.string(),
    policyHolderSocialSecurityNumber: z.string().optional(),
    hasCardFrontImage: z.boolean(),
    hasCardBackImage: z.boolean(),
    insuranceActive: z.boolean(),
    policyNumber: z.string().min(1, 'Required'),
    policyHolderAddress1: z.string().min(1, 'Required'),
    policyHolderAddress2: z.string().optional(),
    policyHolderCity: z.string().min(1, 'Required'),
    policyHolderState: z.string().min(1, 'Required'),
    policyHolderPostalCode: z.string().min(1, 'Required'),
    verificationStatus: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isPatientPolicyHolder) {
      if (!data.policyHolderFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderFirstName'],
        })
      }

      if (!data.policyHolderLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderLastName'],
        })
      }

      if (
        data.policyHolderDateOfBirth === '' ||
        data.policyHolderDateOfBirth === null ||
        data.policyHolderDateOfBirth === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          fatal: true,
          path: ['policyHolderDateOfBirth'],
        })
      } else if (getAgeFromDate(parseDate(data.policyHolderDateOfBirth)) < 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Must be at least 18 years of age',
          fatal: true,
          path: ['policyHolderDateOfBirth'],
        })
      }

      if (!data.policyHolderGender) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderGender'],
        })
      }

      if (!data.policyHolderRelationship) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderRelationship'],
        })
      }
    }
  })

type InsuranceSchemaType = z.infer<typeof insuranceSchema>

export { insuranceSchema, type InsuranceSchemaType }
