import { getAgeFromDate } from '@psychplus-v2/utils'
import z from 'zod'

const getInsuranceSchema = (isRequired = true) =>
  z
    .object({
      payerName: isRequired
        ? z.string().min(1, 'Required')
        : z.string().optional(),
      insurancePlanId: isRequired
        ? z.string().min(1, 'Required')
        : z.string().optional(),
      effectiveDate: isRequired
        ? z.string().min(1, 'Required')
        : z.string().optional(),
      terminationDate: isRequired
        ? z.string().min(1, 'Required')
        : z.string().optional(),
      memberId: isRequired
        ? z.string().trim().min(1, 'Required').max(16, 'Invalid Member ID')
        : z.string().trim().max(16, 'Invalid Member ID').optional(),
      groupNumber: isRequired
        ? z.string().trim().min(1, 'Required').max(16, 'Invalid Gruop Number')
        : z.string().trim().max(16, 'Invalid Gruop Number').optional(),
      isPatientPolicyHolder: z.boolean(),
      policyHolderFirstName: z
        .string()
        .max(28, 'Max 28 characters are allowed')
        .optional(),
      policyHolderLastName: z
        .string()
        .max(28, 'Max 28 characters are allowed')
        .optional(),
      policyHolderGender: z.string().optional().optional(),
      policyHolderRelationship: z.string().optional().optional(),
      insurancePolicyPriority: isRequired
        ? z.string().min(1, 'Required')
        : z.string().optional(),
      policyHolderDateOfBirth: z.string().optional(),
      policyHolderSocialSecurityNumber: z.string().optional(),
      hasCardFrontImage: z.boolean(),
      hasCardBackImage: z.boolean(),
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
        } else if (getAgeFromDate(data.policyHolderDateOfBirth) < 18) {
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

type InsuranceSchemaType = z.infer<ReturnType<typeof getInsuranceSchema>>

export { getInsuranceSchema, type InsuranceSchemaType }
