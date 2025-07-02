import { parseDate } from '@internationalized/date'
import z from 'zod'
import { getAgeFromDate, zipLast4Schema } from '@/utils'

const insuranceSchema = z
  .object({
    payerName: z.string().min(1, 'Required'),
    insurancePlanId: z.string().min(1, 'Required, Select Payer To Enable'),
    effectiveDate: z.string().min(1, 'Required'),
    terminationDate: z.string().min(1, 'Required'),
    memberId: z.string().trim().min(1, 'Required').max(16, 'Invalid Member ID'),
    groupNumber: z
      .string()
      .trim()
      .min(1, 'Required')
      .max(16, 'Invalid Gruop Number'),
    isPatientPolicyHolder: z.boolean(),
    policyHolderFirstName: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    policyHolderLastName: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    policyHolderGender: z.string().optional(),
    policyHolderRelationship: z.string().optional(),
    insurancePolicyPriority: z.string().min(1, 'Required').optional(),
    policyHolderDateOfBirth: z.string().optional(),
    policyHolderSocialSecurityNumber: z.string().optional(),
    hasCardFrontImage: z.boolean(),
    hasCardBackImage: z.boolean(),
    isActive: z.boolean(),
    address1: z.string().max(128, 'Max 128 characters are allowed').optional(),
    address2: z.string().optional(),
    city: z.string().max(28, 'Max 28 characters are allowed').optional(),
    state: z.string().max(28, 'Max 28 characters are allowed').optional(),
    zip: z.string().max(5, 'Invalid ZIP').optional(),
    postalPlus4Code: zipLast4Schema,
    verificationStatus: z.string().min(1, 'Required'),
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

      if (!data.city) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['city'],
        })
      }
      if (!data.state) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['state'],
        })
      }

      if (!data.zip) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['zip'],
        })
      }

      if (!data.policyHolderLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderLastName'],
        })
      }

      if (!data.address1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['address1'],
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
