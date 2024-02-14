import { z } from 'zod'
import { validate } from '@psychplus/form'

const schema = z
  .object({
    providerType: z.enum(['Psychiatrist', 'Therapist']),
    appointmentType: z.enum(['Virtual', 'In-Person']),
    zipCode: z.string().optional(),
  })
  .superRefine(({ appointmentType, zipCode }, ctx) => {
    if (appointmentType === 'In-Person' && zipCode === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['zipCode'],
      })
    } else if (zipCode && !validate.zipCodeRegex.test(zipCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid zip code format!',
        path: ['zipCode'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
