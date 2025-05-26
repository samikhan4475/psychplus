import z from 'zod'
import { zipCodeSchema, zipLast4Schema } from '@/utils'

const MOTHER_CODESET_CODE = 'MTH'

const schema = z
  .object({
    relationship: z.string().min(1, 'Required'),
    firstName: z
      .string()
      .min(1, 'Required')
      .max(35, 'Max 35 characters are allowed'),
    lastName: z
      .string()
      .min(1, 'Required')
      .max(35, 'Max 35 characters are  allowed'),
    middleName: z.string().max(35, 'Max 35 characters are allowed').optional(),
    maidenName: z.string().max(35, 'Max 35 characters are allowed').optional(),
    phone: z.string().min(1, 'Required'),
    email: z.string().min(1, 'Required'),
    isEmergencyContact: z.boolean().default(false),
    isAllowedToReleaseInformation: z.boolean().default(false),
    isGuardian: z.boolean().default(false),
    address: z.string().optional(),
    contactDetails: z.object({
      addresses: z.array(
        z.object({
          type: z.enum(['Home']).default('Home'),
          street1: z.string().min(1, 'Required'),
          street2: z.string().optional().default(''),
          city: z.string().optional().default(''),
          state: z.string().optional().default(''),
          country: z.string().optional().default(''),
          postalCode: zipCodeSchema,
          zipLast4: zipLast4Schema,
        }),
      ),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.relationship === MOTHER_CODESET_CODE) {
      if (!data?.maidenName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['maidenName'],
          message: 'Required',
        })
      }
    }
  })

type AddRelationshipSchemaType = z.infer<typeof schema>

export { schema, type AddRelationshipSchemaType, MOTHER_CODESET_CODE }
