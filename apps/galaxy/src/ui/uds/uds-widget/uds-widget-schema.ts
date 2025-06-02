import z from 'zod'

const udsWidgetSchema = z
  .object({
    purposeOfVisit: z.string().min(1, 'required'),
    medicalNecessity: z.array(z.string()).min(1, 'required'),
    confirmatoryTesting: z.string().min(1, 'required'),
    confirmationReasons: z.array(z.string()).optional(),
    result: z.string().min(1, 'required'),
    udsOther: z.string().optional(),
    resultAction: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.medicalNecessity?.includes('Other') && data.udsOther === '')
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['udsOther'],
        message: 'Required',
      })
    if (
      data.confirmatoryTesting === 'yes' &&
      data.confirmationReasons?.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmationReasons'],
        message: 'Required',
      })
    }
  })

type UdsWidgetSchemaType = z.infer<typeof udsWidgetSchema>

export { udsWidgetSchema, type UdsWidgetSchemaType }
