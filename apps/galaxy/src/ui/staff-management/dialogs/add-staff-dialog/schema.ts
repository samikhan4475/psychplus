import { z } from 'zod'

const ContactInfoSchema = z.object({
  email: z.string().email(),
  emailVerificationStatus: z.string(),
  phoneNumbers: z.array(
    z.object({
      type: z.string(),
      number: z.string(),
      extension: z.string().optional(),
      comment: z.string().optional(),
    }),
  ),
  addresses: z.array(
    z.object({
      type: z.string(),
      street1: z.string(),
      street2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string(),
      geoCoordinates: z
        .object({
          longitude: z.number(),
          latitude: z.number(),
          altitude: z.number(),
        })
        .optional(),
      timeZoneId: z.string().optional(),
    }),
  ),
  isMailingAddressSameAsPrimary: z.boolean(),
})

const NameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  preferredName: z.string().optional(),
  title: z.string().optional(),
  suffix: z.string().optional(),
  honors: z.string().optional(),
})

const GuardianSchema = z.object({
  name: NameSchema,
  isEmergencyContact: z.boolean(),
  relationship: z.string(),
  contact: ContactInfoSchema,
})

const schema = z.object({
  otpCode: z.string(),
  legalName: NameSchema,
  dateOfBirth: z.string(),
  gender: z.string(),
  socialSecurityNumber: z.string(),
  userRoleId: z.number(),
  contactInfo: ContactInfoSchema,
  language: z.array(z.string()),
  preferredLanguage: z.string(),
  guardian: GuardianSchema.optional(),
  password: z.string(),
  passwordConfirm: z.string(),
  staffRoleId: z.number(),
  supervisedBy: z.string(),
  supervisorStaffId: z.number(),
  npi: z.string(),
  status: z.string(),
  virtualRoomLink: z.string().url(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
