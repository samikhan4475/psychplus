import { z } from 'zod'

const legalNameSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  suffix: z.string().optional(),
})
const PhoneNumber = z.object({
  type: z.string().optional(),
  number: z.string().optional(),
  extension: z.string().optional(),
  comment: z.string().optional(),
})
const geoCoordinates = z.object({
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  altitude: z.number().optional(),
})
const clinicAddress = z.object({
  type: z.string().optional(),
  street1: z.string().optional(),
  street2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  geoCoordinates: geoCoordinates.optional(),
  timeZoneId: z.string().optional(),
})

const contactInfoSchema = z.object({
  email: z.string().email().optional(),
  emailVerificationStatus: z.string().optional(),
  phoneNumbers: z.array(PhoneNumber).optional(),
  addresses: z.array(clinicAddress).optional(),
  isMailingAddressSameAsPrimary: z.boolean().optional(),
})

const emailSchema = z.object({
  id: z.number().optional(),
  legalName: legalNameSchema.optional(),
  userRoleCode: z.string().optional(),
  contactInfo: contactInfoSchema.optional(),
  staffId: z.number().optional(),
  patientId: z.number().optional(),
})
const externalEmailSchema = z.object({
  label: z.string(),
  value: z.any(),
})
const sendMessageSchema = z
  .object({
    messageId: z.string().min(1, { message: 'MessageId is required' }),
    subject: z.string().min(1, { message: 'Subject is required' }),
    text: z.string().min(1, { message: 'Text is required' }),
    internalEmails: z.array(emailSchema).optional(),
    userRecipients: z.array(emailSchema).optional(),
    externalEmails: z.array(externalEmailSchema).optional(),
  })
  .refine(
    (data) => {
      return (
        (data.internalEmails?.length || 0) > 0 ||
        (data.externalEmails?.length || 0) > 0 ||
        (data.userRecipients?.length || 0) > 0
      )
    },
    {
      message:
        'At least one email is required from internal, external, or user recipients.',
      path: ['internalEmails'],
    },
  )

type SendMessageSchemaType = z.infer<typeof sendMessageSchema>

export { sendMessageSchema, type SendMessageSchemaType }
