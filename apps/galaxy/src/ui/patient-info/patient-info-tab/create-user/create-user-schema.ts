import { type DateValue } from 'react-aria-components'
import z from 'zod'

const createUserSchema = z
  .object({
    gender: z.string(),
    id: z.string(),
    firstName: z.string().trim().min(1, 'Required'),
    middleName: z.string().trim(),
    lastName: z.string().trim().min(1, 'Required'),
    dob: z.custom<DateValue>().superRefine((val, ctx) => {
      // ctx.addIssue({
      //   code: z.ZodIssueCode.custom,
      //   message: 'should be >= 10',
      //   fatal: true,
      // })
    }),
    phone: z
      .string()
      .trim()
      .min(1, 'Required')
      .length(10, 'Invalid phone number'),
    email: z.string().trim().min(1, 'Required').email('Invalid email address'),
    hasGuardian: z.enum(['yes', 'no']),
    guardianFirstName: z.string().trim(),
    guardianLastName: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.hasGuardian === 'yes') {
      if (!val.guardianFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['guardianFirstName'],
          message: 'Required',
        })
      }
      if (!val.guardianLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['guardianLastName'],
          message: 'Required',
        })
      }
    }
  })

type CreateUserSchema = z.infer<typeof createUserSchema>

export { createUserSchema, type CreateUserSchema }
