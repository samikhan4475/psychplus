import { DateValue } from 'react-aria-components'
import z from 'zod'

const phoneRegex = /^\+?[1-9]\d{7,14}$/
const nameRegex = /^[^\d]*$/

const schema = z
  .object({
    firstName: z
      .string()
      .min(1, 'Required')
      .regex(nameRegex, 'Cannot contain numbers'),
    middleName: z.coerce
      .string()
      .regex(nameRegex, 'Cannot contain numbers')
      .optional(),
    lastName: z
      .string()
      .min(1, 'Required')
      .regex(nameRegex, 'Cannot contain numbers'),
    gender: z.string().min(1, 'Required'),
    dateOfBirth: z
      .custom<DateValue>()
      .refine((val) => val !== null && val !== undefined, {
        message: 'Required',
      }),
    phoneNumber: z
      .string()
      .min(1, 'Required')
      .regex(phoneRegex, 'Invalid phone number'),
    email: z.string().min(1, 'Required').email('Invalid email address'),
    hasGuardian: z.string(),
    guardianFirstName: z
      .string()
      .optional()
      .refine(
        (val) => val !== undefined && nameRegex.test(val),
        'Cannot contain numbers',
      ),
    guardianLastName: z
      .string()
      .optional()
      .refine(
        (val) => val !== undefined && nameRegex.test(val),
        'Cannot contain numbers',
      ),
    relationship: z.string().optional(),
    patientPolicyA: z.boolean().optional(),
    patientPolicyB: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasGuardian === 'yes') {
      if (!data.guardianFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['guardianFirstName'],
        })
      }
      if (!data.guardianLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['guardianLastName'],
        })
      }
      if (!data.relationship) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['relationship'],
        })
      }
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
