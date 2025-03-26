import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const nameRegex = /^[^\d]*$/
const requiredString = z
  .string()
  .min(1, 'Required')
  .max(128, { message: 'Cannot exceed 128 characters' })
const requiredName = z
  .string()
  .regex(nameRegex, 'Numbers are not allowed')
  .min(1, 'Required')
  .max(35, { message: 'Cannot exceed 35 characters' })
const optionalString = z
  .string()
  .max(128, { message: 'Cannot exceed 128 characters' })
  .optional()
  .default('')

const validateAddressFields = (
  address: any,
  pathPrefix: string,
  ctx: z.RefinementCtx,
) => {
  const fields = ['street1', 'city', 'state', 'postalCode']
  fields.forEach((field) => {
    if (!address[field] || address[field].trim().length < 1) {
      ctx.addIssue({
        path: [`contactInfo.addresses.${pathPrefix}.${field}`],
        message: `Required`,
        code: z.ZodIssueCode.custom,
      })
    }
  })
}

const addressSchema = z.object({
  type: z.string(),
  street1: optionalString,
  street2: optionalString,
  city: optionalString,
  state: optionalString,
  country: optionalString,
  postalCode: optionalString,
  geoCoordinates: z
    .object({
      longitude: z.number(),
      latitude: z.number(),
      altitude: z.number(),
    })
    .optional(),
  timeZoneId: optionalString,
})
const ContactInfoSchema = z.object({
  email: requiredString.email(),
  emailVerificationStatus: z.string().nullable(),
  phoneNumbers: z.array(
    z.object({
      type: z.string().optional(),
      number: requiredString,
      extension: optionalString,
      comment: optionalString,
    }),
  ),
  addresses: z.array(addressSchema),
  isMailingAddressSameAsPrimary: z.boolean(),
})

const NameSchema = z.object({
  firstName: requiredName,
  middleName: optionalString,
  lastName: requiredName,
  preferredName: optionalString,
  title: optionalString,
  suffix: optionalString,
  honors: optionalString,
})

const GuardianSchema = z.object({
  name: NameSchema,
  isEmergencyContact: z.boolean(),
  relationship: z.string(),
  contact: ContactInfoSchema,
})

const schema = z
  .object({
    otpCode: z.string(),
    legalName: NameSchema,
    dateOfBirth: z
      .custom<DateValue | null>()
      .refine((value) => value !== undefined, {
        message: 'Required',
      }),
    gender: requiredString,
    socialSecurityNumber: z.string(),
    userRoleId: optionalString,
    contactInfo: ContactInfoSchema,
    language: z.array(z.string()).min(1, { message: 'Minimum 1 is required' }),
    preferredLanguage: z.string(),
    guardian: GuardianSchema.optional(),
    password: requiredString,
    passwordConfirm: z.string(),
    staffRoleId: optionalString,
    supervisedBy: z.string(),
    supervisorStaffId: optionalString,
    npi: z
      .string()
      .min(1, { message: 'Required' })
      .min(10, { message: 'NPI must be 10 characters' }),
    status: requiredString,
    providerAttributions: z.array(z.string()).optional(),
    staffUserRoleIds: z.array(z.string().min(1, { message: 'Required' })),
    virtualRoomLink: optionalString,
    staffType: optionalString,
    organizationIds: z.array(z.string().min(1, { message: 'Required' })),
    practiceIds: z.array(z.string().min(1, { message: 'Required' })),
    timeZonePreference: requiredString,
    isTest: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const { addresses, isMailingAddressSameAsPrimary } = data.contactInfo

    validateAddressFields(addresses[0], '0', ctx)
    if (!isMailingAddressSameAsPrimary)
      validateAddressFields(addresses[1], '1', ctx)
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
