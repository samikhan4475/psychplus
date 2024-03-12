import { z } from 'zod'
import { validate } from '@psychplus/form'

const schema = z
  .object({
    firstName: validate.requiredString,
    middleName: validate.nullableString,
    lastName: validate.requiredString,
    preferredName: validate.nullableString,
    drivingLicenseNo: validate.nullableString,
    drivingLicenseState: validate.nullableString,
    dateOfBirth: validate.requiredString,
    language: validate.nullableString,
    email: validate.email,
    phoneNumber: validate.phoneNumber,
    ssn: validate.nullableString,
    stateOfResidence: validate.nullableString,
    gender: validate.nullableString,
    genderOrientation: validate.nullableString,
    genderExpression: validate.nullableString,
    pronoun: validate.nullableString,
    address1: validate.requiredString,
    address2: validate.nullableString,
    state: validate.requiredString,
    city: validate.requiredString,
    zipCode: validate.requiredString,
    isMailingAddressSameAsHome: z.boolean().default(false),
    mailingAddress1: validate.nullableString,
    mailingAddress2: validate.nullableString,
    mailingState: validate.nullableString,
    mailingCity: validate.nullableString,
    mailingZipCode: validate.nullableString,
    isParentOrGuardian: z.boolean().default(false),
    isEmergencyContactSameAsParentOrGuardian: z.boolean().default(false),
    guardianFirstName: validate.nullableString,
    guardianMiddleName: validate.nullableString,
    guardianLastName: validate.nullableString,
    guardianRelationship: validate.nullableString,
    guardianPhoneNumber: validate.nullableString,
    guardianEmail: z.string().email().optional(),
    emergencyContactFirstName: validate.nullableString,
    emergencyContactMiddleName: validate.nullableString,
    emergencyContactLastName: validate.nullableString,
    emergencyContactRelationship: validate.nullableString,
    emergencyContactPhoneNumber: validate.nullableString,
    emergencyContactEmail: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isParentOrGuardian) {
      const requiredGuardianFields: (keyof typeof data)[] = [
        'guardianFirstName',
        'guardianLastName',
        'guardianRelationship',
        'guardianPhoneNumber',
        'guardianEmail',
      ]

      for (const field of requiredGuardianFields) {
        if (!data[field]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: [field],
          })
        }
      }
    }

    if (!data.isMailingAddressSameAsHome) {
      const mailingAddressFields: (keyof typeof data)[] = [
        'mailingAddress1',
        'mailingCity',
        'mailingState',
        'mailingZipCode',
      ]

      for (const field of mailingAddressFields) {
        if (!data[field]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: [field],
          })
        }
      }
    }

    const currentDate = new Date()
    const dob = new Date(data.dateOfBirth)

    if (dob) {
      const ageInYears = currentDate.getFullYear() - dob.getFullYear()

      if (ageInYears <= 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Age can't be less than 5 years!",
          path: ['dateOfBirth'],
        })
      }
    }

    if (!data.language) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['language'],
      })
    }
    if (!data.stateOfResidence) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['stateOfResidence'],
      })
    }
    if (!data.gender) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['gender'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
