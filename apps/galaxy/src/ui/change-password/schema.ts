import z from 'zod'

const schema = z
  .object({
    resetCode: z.string().trim().min(1, 'Code is required'),
    newPassword: z
      .string()
      .min(8, { message: '8 characters minimum' })
      .regex(/[A-Z]/, { message: 'One uppercase letter' })
      .regex(/[a-z]/, { message: 'One lowercase letter' })
      .regex(/\d/, { message: 'One number' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'One special character (e.g., !, @, #, $)',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Your new & confirmation passwords must match',
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
