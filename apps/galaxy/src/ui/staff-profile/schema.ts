import { CalendarDate } from '@internationalized/date'
import { z } from 'zod'
import { PatientAddressType } from '@/types'
import { zipLast4Schema } from '@/utils'
import { StaffType } from '../staff-management/types'

const requiredString = z
  .string()
  .min(1, 'Required')
  .max(128, { message: 'Cannot exceed 128 characters' })

const requiredName = z
  .string()
  .min(1, 'Required')
  .max(35, { message: 'Cannot exceed 35 characters' })

const optionalString = z
  .string()
  .max(128, { message: 'Cannot exceed 128 characters' })
  .optional()

const isNpiValid = (npi: string): boolean => /^\d{10}$/.test(npi) // only digits, exactly 10

const nameSchema = z.object({
  firstName: requiredName,
  middleName: optionalString,
  lastName: requiredName,
  preferredName: optionalString,
  title: optionalString,
  suffix: optionalString,
  honors: optionalString,
})

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

const ContactInfoSchema = z.object({
  email: requiredString.email(),
  emailVerificationStatus: z.ostring().nullable(),
  phoneNumbers: z
    .array(
      z
        .object({
          type: z.string().optional(),
          number: optionalString,
          extension: optionalString,
          comment: optionalString,
        })
        .optional(),
    )
    .optional(),
  isMailingAddressSameAsPrimary: z.boolean(),
})

const schema = z
  .object({
    isTest: z.boolean(),
    staffId: requiredString,
    userId: requiredString,
    staffRoleId: optionalString,
    status: requiredString,
    phoneContact: requiredString,
    legalName: nameSchema,
    staffUserRoleIds: z.array(requiredString),
    dob: z
      .custom<CalendarDate | null>()
      .refine((value) => value !== undefined, {
        message: 'Required',
      }),
    spokenLanguages: z.array(z.string()).optional().optional(),
    virtualRoomLink: optionalString,
    isVirtualRoomLink: z.boolean().optional(),
    biography: z
      .string()
      .max(2000, 'Max 2000 characters are allowed')
      .optional(),
    npi: z.string().optional(),
    gender: requiredString,
    homeAddress: getAddressSchema('Home'),
    mailingAddress: getAddressSchema('Mailing'),
    supervisedBy: optionalString,
    staffTypeLabel: optionalString,
    supervisorStaffId: z.string(),
    specialists: z.array(requiredString),
    providerAttributions: z.array(z.string()).optional(),
    organizationIds: z.array(requiredString),
    practiceIds: z.array(requiredString),
    timeZonePreference: requiredString,
    hasBioVideo: z.boolean().optional(),
    staffTypeIds: z.array(requiredString),
    contactInfo: ContactInfoSchema,
    hasPhoto: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const {
      mailingAddress,
      contactInfo: { isMailingAddressSameAsPrimary },
      isVirtualRoomLink,
      virtualRoomLink,
      staffTypeLabel,
      npi,
    } = data

    if (staffTypeLabel === StaffType.Provider || npi) {
      if (!npi?.trim()) {
        ctx.addIssue({
          path: ['npi'],
          message: 'Required',
          code: z.ZodIssueCode.custom,
        })
      } else if (!isNpiValid(npi)) {
        ctx.addIssue({
          path: ['npi'],
          message: 'NPI must be 10 characterss',
          code: z.ZodIssueCode.custom,
        })
      }
    }
    if (staffTypeLabel === StaffType.Provider && !data?.legalName?.title) {
      ctx.addIssue({
        path: ['legalName.title'],
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
