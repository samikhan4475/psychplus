import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z
  .object({
    patientId: z.string().min(1, 'Required'),
    patientInsurancePolicyId: z.string().min(1, 'Required'),
    practiceId: z.string().min(1, 'Required'),
    providerId: z.string().min(1, 'Required'),
    locationId: z.string().min(1, 'Required'),
    memberId: z.string().min(1, 'Required'),
    residingStateCode: z.string().min(1, 'Required'),
    serviceDate: z
      .custom<DateValue>()
      .refine((val) => val !== undefined && val !== null, {
        message: 'Required',
      }),
    serviceTypeCode: z.string().optional(),
    cptCodes: z
      .array(z.string().min(1, 'CPT code cannot be empty'))
      .default(['99214'])
      .optional(),
    isService: z.string().min(1, 'Required'),
    authenticatedUserId: z.number().optional().default(0),
  })
  .superRefine((data, ctx) => {
    if (data.isService === 'service') {
      if (!data.serviceTypeCode || data.serviceTypeCode.trim() === '') {
        ctx.addIssue({
          path: ['serviceTypeCode'],
          code: z.ZodIssueCode.custom,
          message: 'Required',
        })
      }
    } else if (data.isService === 'cpt') {
      if (!data.cptCodes || data.cptCodes.length === 0) {
        ctx.addIssue({
          path: ['cptCodes'],
          code: z.ZodIssueCode.custom,
          message: 'At least one CPT Code is required ',
        })
      }
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
