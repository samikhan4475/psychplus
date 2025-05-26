import { DateValue } from 'react-aria-components'
import { z } from 'zod'
import { PatientAddressType } from '@/types'
import { zipLast4Schema } from '@/utils'
import { StaffType } from '../../types'

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
  path: string,
  ctx: z.RefinementCtx,
) => {
  const fields = ['street1', 'city', 'state', 'postalCode']
  fields.forEach((field) => {
    if (!address[field] || address[field].trim().length < 1) {
      ctx.addIssue({
        path: [path],
        message: `Required`,
        code: z.ZodIssueCode.custom,
      })
    }
  })
}

const getAddressSchema = (type: PatientAddressType) =>
  z
    .object({
      type: z.string().optional(),
      street1: type === 'Mailing' ? optionalString : requiredString,
      street2: optionalString,
      city: type === 'Mailing' ? optionalString : requiredString,
      state: type === 'Mailing' ? optionalString : requiredString,
      country: optionalString,
      postalCode: type === 'Mailing' ? optionalString : requiredString,
      zipLast4: zipLast4Schema,
      geoCoordinates: z
        .object({
          longitude: z.number(),
          latitude: z.number(),
          altitude: z.number(),
        })
        .optional(),
      timeZoneId: optionalString,
    })
    .optional()

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
  isMailingAddressSameAsPrimary: z.boolean(),
})

const NameSchema = z.object({
  firstName: requiredString,
  middleName: optionalString,
  lastName: requiredName,
  preferredName: optionalString,
  title: optionalString,
  suffix: optionalString,
  honors: z.ostring(),
})

const schema = z
  .object({
    staffId: z.ostring(),
    hasBioVideo: z.boolean().optional(),
    otpCode: z.string(),
    legalName: NameSchema,
    dateOfBirth: z.custom<DateValue>().refine((val) => val, {
      message: 'Required',
    }),
    gender: requiredString,
    socialSecurityNumber: z.string(),
    userRoleId: optionalString,
    contactInfo: ContactInfoSchema,
    biography: z
      .string()
      .max(2000, 'Max 2000 characters are allowed')
      .optional(),
    language: z.array(z.string()).optional(),
    preferredLanguage: z.string(),
    password: z.string().min(1, 'Required'),
    passwordConfirm: z.ostring(),
    relationship: z.ostring(),
    staffRoleId: optionalString,
    supervisedBy: z.ostring(),
    referralSource: z.ostring(),
    referralName: z.ostring(),
    hipaaConsentOn: z.ostring(),
    termsOfServiceConsentOn: z.ostring(),
    privacyPolicyConsentOn: z.ostring(),
    supervisorStaffId: optionalString,
    staffTypeLabel: z.ostring(),
    npi: z
      .string()
      .optional()
      .refine((npi) => (npi ? npi.length === 10 : true), {
        message: 'NPI must be 10 characters',
      }),
    status: z.string().min(1, 'Required'),
    providerAttributions: z.array(z.string()).optional(),
    staffUserRoleIds: z.array(z.string().min(1, { message: 'Required' })),
    virtualRoomLink: z.string().min(1, 'Required'),
    isVirtualRoomLink: z.boolean().optional(),
    staffType: z.string().min(1, 'Required'),
    organizationIds: z.array(z.string().min(1, { message: 'Required' })),
    practiceIds: z
      .array(z.string().min(1, { message: 'Required' }))
      .min(1, 'Required'),
    timeZonePreference: requiredString,
    isTest: z.boolean(),
    homeAddress: getAddressSchema('Home').optional(),
    mailingAddress: getAddressSchema('Mailing'),
    bioVideo: z.instanceof(File).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    const {
      mailingAddress,
      contactInfo: { isMailingAddressSameAsPrimary },
      staffTypeLabel,
      npi,
      isVirtualRoomLink,
      virtualRoomLink,
    } = data
    if (staffTypeLabel === StaffType.Provider && !npi) {
      ctx.addIssue({
        path: ['npi'],
        message: `Required`,
        code: z.ZodIssueCode.custom,
      })
    }
    if (staffTypeLabel === StaffType.Provider && !data?.legalName?.honors) {
      ctx.addIssue({
        path: ['legalName.honors'],
        message: `Required`,
        code: z.ZodIssueCode.custom,
      })
    }
    if (isVirtualRoomLink && !virtualRoomLink) {
      ctx.addIssue({
        path: ['virtualRoomLink'],
        message: `Required`,
        code: z.ZodIssueCode.custom,
      })
    }

    if (!isMailingAddressSameAsPrimary)
      validateAddressFields(mailingAddress, 'mailingAddress', ctx)
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
