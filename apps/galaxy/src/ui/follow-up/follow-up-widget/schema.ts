import z from 'zod'

const schema = z
  .object({
    next: z.string(),
    location: z.string().optional(),
    providerId: z.string().optional(),
    isOverridePermissionProvided: z.boolean().optional().default(false),
    isProceedPermissionProvided: z.boolean().optional().default(false),
    reason: z.string().optional(),
    isPatientWilling: z.boolean().optional(),
    type: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.location)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['location'],
        message: 'Required',
      })
    if (!data.providerId)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['providerId'],
        message: 'Required',
      })
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
