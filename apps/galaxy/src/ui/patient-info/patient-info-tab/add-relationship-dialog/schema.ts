import z from 'zod'

const MOTHER_CODESET_CODE = 'MTH'

const schema = z
  .object({
    relationship: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    middleName: z.string().optional(),
    maidenName: z.string().optional(),
    phone: z.string().min(1, 'Required'),
    email: z.string().min(1, 'Required'),
    isEmergencyContact: z.boolean().default(false),
    isAllowedToReleaseInformation: z.boolean().default(false),
    isGuardian: z.boolean().default(false),
    address: z.string().optional(),
    postalCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    console.log('Test')
    if (data.relationship === MOTHER_CODESET_CODE) {
      if (data.maidenName && data.maidenName.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['maidenName'],
          message: 'Required',
        })
      }
    }

    if (data.postalCode || data.address) {
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['address'],
          message: 'Required',
        })
      }
      if (!data.postalCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['postalCode'],
          message: 'Required',
        })
      }
    }
  })

type AddRelationshipSchemaType = z.infer<typeof schema>

export { schema, type AddRelationshipSchemaType, MOTHER_CODESET_CODE }
