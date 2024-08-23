import { type DateValue } from 'react-aria-components'
import z from 'zod'

const createUserSchema = z.object({
  firstName: z.string().trim().min(1, 'Required'),
  middleName: z.string().trim(),
  lastName: z.string().trim().min(1, 'Required'),
  dob: z.custom<DateValue>().superRefine((val, ctx) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'should be >= 10',
      fatal: true,
    })
  }),
})

type CreateUserSchema = z.infer<typeof createUserSchema>

export { createUserSchema, type CreateUserSchema }
