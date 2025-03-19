import z from 'zod'

const phoneNumberTypeEnum = z.enum(['Contact', 'Home', 'Business'])
const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const phoneRegex = /^(\+?[1-9]\d{9}|^$)$/
const nameRegex = /^[^\d]*$/
const nameValidation = z
  .string()
  .regex(nameRegex, 'Numbers are not allowed')
  .min(1, 'Required')
  .max(35, { message: 'Cannot exceed 35 characters' })
const optionalNameValidation = z
  .string()
  .regex(nameRegex, 'Numbers are not allowed')
  .max(35, { message: 'Cannot exceed 35 characters' })
  .optional()

const requiredString = z
  .string()
  .max(128, { message: 'Cannot exceed 128 characters' })

const addPatientSchema = z
  .object({
    legalName: z.object({
      firstName: nameValidation,
      lastName: nameValidation,
      middleName: optionalNameValidation,
    }),
    isTest: z.boolean(),
    dateOfBirth: z.string().min(1, 'Required'),
    gender: z.string().min(1, 'Required'),
    referralSource: z.string().optional(),
    password: z.string().optional(),
    email: z.string().optional(),
    referralName: optionalNameValidation,

    state: z.string().optional(),
    contactInfo: z.object({
      phoneNumbers: z
        .array(
          z.object({
            type: phoneNumberTypeEnum.optional().default('Home'),
            number: z.union([
              z
                .string()
                .min(9, 'Invalid phone number')
                .regex(phoneRegex, 'Invalid phone number'),

              z.literal(''), // Allow empty string
            ]),
          }),
        )
        .optional(),
      addresses: z
        .array(
          z.object({
            type: z.string().optional().default('Home'),
            street1: requiredString.optional(),
            street2: requiredString.optional(),
            city: requiredString.optional(),
            state: requiredString.optional(),
            country: requiredString.optional(),
            postalCode: z
              .string()
              .trim()
              .regex(zipCodeRegex, 'Invalid zip code!')
              .optional(),
          }),
        )
        .optional(),
      isMailingAddressSameAsPrimary: z.boolean().optional(),
    }),

    guardian: z
      .object({
        name: z.object({
          firstName: optionalNameValidation,
          lastName: optionalNameValidation,
        }),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.guardian?.name?.lastName && !data.guardian?.name?.firstName) ||
      (data.guardian?.name?.firstName && !data.guardian?.name?.lastName)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: data.guardian?.name?.lastName
          ? ['guardian', 'name', 'firstName']
          : ['guardian', 'name', 'lastName'],
        message: 'Required',
      })
    }

    data?.contactInfo?.addresses?.forEach((address, index) => {
      const { street1, postalCode, city, state, street2 } = address
      if (street1 && !postalCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['contactInfo', 'addresses', index, 'postalCode'],
          message: 'Required',
        })
      }
      if (city || state || postalCode || street2) {
        if (!street1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['contactInfo', 'addresses', index, 'street1'],
            message: 'Required',
          })
        }
      }
    })
  })

type AddPatientSchemaType = z.infer<typeof addPatientSchema>

export { addPatientSchema, type AddPatientSchemaType }
