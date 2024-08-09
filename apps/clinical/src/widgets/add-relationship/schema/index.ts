import { validate } from "@psychplus/form"
import z from "zod"

const schema = z.object({
  id: validate.anyString.optional(),
  patientId: validate.numberOnly,
  name: z.object({
    firstName: validate.requiredName,
    middleName: validate.optionalName.default(''),
    lastName: validate.requiredName,
    preferredName: validate.optionalName.default(''),
    title: validate.optionalName.default(''),
    suffix: validate.optionalName.default(''),
    honors: validate.optionalString,
  }),
  isEmergencyContact: z.boolean(),
  isGuardian: z.boolean().optional(),
  guardianRelationshipCode: validate.requiredString,
  contactDetails: z.object({
    email: validate.email,
    phoneNumbers: z.array(
      z.object({
        type: validate.anyString.optional(),
        number: validate.phoneNumber,
        extension: validate.optionalString,
        comment: validate.optionalString,
      }),
    ),
    addresses: z.array(
      z.object({
        type: z.string().optional().default('Home'),
        street1: validate.requiredString,
        street2: validate.optionalString,
        city: validate.optionalString,
        state: validate.optionalString,
        country: validate.optionalString,
        postalCode: validate.zipCode,
      }),
    ),
    isMailingAddressSameAsPrimary: z.boolean(),
  }),
  isAllowedToReleaseInformation: z.boolean(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }