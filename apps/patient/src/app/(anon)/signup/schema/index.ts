import { z } from 'zod'
import { validate } from '@psychplus/form'

const schema = z
  .object({
    firstName: validate.requiredString,
    lastName: validate.requiredString,
    dateOfBirth: validate.requiredString,
    phoneNumber: validate.phoneNumber,
    email: validate.email,
    password: validate.passwordStrong,
    confirmPassword: validate.passwordStrong,
    isParentOrGuardian: z.boolean().default(false),
    guardianFirstName: z.string().optional(),
    guardianLastName: z.string().optional(),
    agreeToTerms: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'Please agree to electronically sign Policies and Procedures!',
      }),
  })
  .superRefine(
    (
      {
        password,
        confirmPassword,
        isParentOrGuardian,
        guardianFirstName,
        guardianLastName,
        dateOfBirth,
      },
      ctx,
    ) => {
      const currentDate = new Date()
      const dob = new Date(dateOfBirth)

      if (dob) {
        const ageInYears = currentDate.getFullYear() - dob.getFullYear()

        if (ageInYears <= 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Age can't be less than 5 years!",
            path: ['dateOfBirth'],
          })
        }
      }
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match',
          path: ['confirmPassword'],
        })
      }

      if (isParentOrGuardian) {
        if (!guardianFirstName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: ['guardianFirstName'],
          })
        }

        if (!guardianLastName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: ['guardianLastName'],
          })
        }
      }
    },
  )

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
