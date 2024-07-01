import { validate } from '@psychplus/form'
import { z } from 'zod'

const phoneRegex = /^\+?[1-9]\d{7,14}$/

const schema = z.object({
  id: z.number(),
  legalName: z.object({
    firstName: validate.requiredString,
    lastName: validate.requiredString,
    middleName: validate.optionalString,
    preferredName: validate.optionalString,
    title: validate.optionalString,
    suffix: validate.optionalString,
    honors: validate.optionalString,
  }),
  birthdate: validate.requiredString,
  hasGuardian: z.boolean(),
  gender: z.string(),
  genderOrientation: validate.optionalString,
  genderExpression: validate.optionalString,
  genderPronoun: validate.optionalString,
  driversLicense: z
    .object({
      type: z.string().optional().default('DriversLicense'),
      number: validate.optionalString,
      validIn: validate.optionalString,
      hasFrontImage: z.boolean(),
      hasBackImage: z.boolean().optional(),
    })
    .optional(),
  contactDetails: z.object({
    email: validate.email,
    homeNumber: z.object({
      type: z.string().optional().default('Home'),
      number: validate.optionalString,
      extension: validate.optionalString,
      comment: validate.optionalString,
    }),
    workNumber: z.object({
      type: z.string().optional().default('Business'),
      number: validate.optionalString,
      extension: validate.optionalString,
      comment: validate.optionalString,
    }),
    mobileNumber: z.object({
      type: z.string().optional().default('Contact'),
      number: validate.phoneNumber,
      extension: validate.optionalString,
      comment: validate.optionalString,
    }),
    homeAddress: z.object({
      type: z.string().default('Home'),
      street1: validate.requiredString,
      street2: validate.optionalString,
      city: validate.requiredString,
      state: validate.requiredString,
      country: validate.requiredString,
      postalCode: validate.requiredString,
    }),
    mailingAddress: z.object({
      type: z.string(),
      street1: validate.optionalString,
      street2: z.string().optional().default('Mailing'),
      city: validate.optionalString,
      state: validate.optionalString,
      country: validate.optionalString,
      postalCode: validate.optionalString,
    }),
    isMailingAddressSameAsPrimary: z.boolean().optional(),
  }),
  cmdId: z.string().optional(),
  motherMaidenName: z.string().optional(),
  alternateOrPreviousName: z
    .object({
      firstName: validate.optionalString,
      lastName: validate.optionalString,
      middleName: validate.optionalString,
      preferredName: validate.optionalString,
      title: validate.optionalString,
      suffix: validate.optionalString,
      honors: validate.optionalString,
    })
    .nullable()
    .default(null),
  alternateOrPreviousContactDetails: z
    .object({
      homeAddress: z.object({
        type: z.string().default('Home'),
        street1: validate.optionalString,
        street2: validate.optionalString,
        city: validate.optionalString,
        state: validate.optionalString,
        country: validate.optionalString,
        postalCode: validate.optionalString,
      }),
    })
    .nullable(),
  language: z.string().optional(),
  languageAbility: validate.optionalString,
  languageProficiency: validate.optionalString,
  religion: validate.optionalString,
  races: validate.emptyOrStringArray,
  ethnicities: validate.emptyOrStringArray,
  preferredLanguage: validate.optionalString,
  chargeUserId: validate.optionalString,
  isTest: z.boolean(),
  isPlusMember: z.boolean(),
  hasPhoto: z.boolean(),
  chargeKey: validate.optionalString,
  medicalRecordNumber: validate.optionalString,
  socialSecurityNumber: validate.optionalString,
  guardian: z
    .object({
      name: z.object({
        firstName: validate.optionalString,
        lastName: validate.optionalString,
      }),
    }).optional(),
  verificationStatus: validate.optionalString,
  status: validate.optionalString,
})
.superRefine((data, ctx) => {
  const hasFirstNameWithNoLastName = data.alternateOrPreviousName?.firstName && !data.alternateOrPreviousName?.lastName
  const hasLastNameWithNoFirstName = data.alternateOrPreviousName?.lastName && !data.alternateOrPreviousName?.firstName
  const hasHomeCommentsExtWithNoNumber = !data.contactDetails.homeNumber.number && (data.contactDetails.homeNumber.comment || data.contactDetails.homeNumber.extension)
  const hasWorkCommentsExtWithNoNumber = !data.contactDetails.workNumber.number && (data.contactDetails.workNumber.comment || data.contactDetails.workNumber.extension)
  // alternateOrPreviousName validations
  if (hasFirstNameWithNoLastName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Required',
      path: [`alternateOrPreviousName.lastName`]
    })
  } else if (hasLastNameWithNoFirstName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Required',
      path: [`alternateOrPreviousName.firstName`]
    })
  }

  // additionalContactInfo validations
  if (hasHomeCommentsExtWithNoNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Required',
      path: ['contactDetails.homeNumber.number']
    })
  }

  if (hasWorkCommentsExtWithNoNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Required',
      path: ['contactDetails.workNumber.number']
    })
  }

  if (data.contactDetails.homeNumber.number !== '' && !data.contactDetails.homeNumber.number.match(phoneRegex)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number',
      path: ['contactDetails.homeNumber.number'],
    })
  }

  if (data.contactDetails.workNumber.number !== '' && !data.contactDetails.workNumber.number.match(phoneRegex)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number',
      path: ['contactDetails.workNumber.number'],
    })
  }

  // guardianInfo Validations
  if (data.hasGuardian && data.guardian) {
    const requiredGuardianFields: (keyof typeof data.guardian.name)[] = [
      'firstName',
      'lastName',
    ]
    for (const field of requiredGuardianFields) {
      if (!data.guardian.name[field]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: [`guardian.name.${field}`]
        })
      }
    }
  }

  // patientAddress validations
  if (!data.contactDetails.isMailingAddressSameAsPrimary) {
    const mailingAddressFields: (keyof typeof data.contactDetails.mailingAddress)[] = [
      'street1',
      'city',
      'state',
      'postalCode',
    ]
    
    for (const field of mailingAddressFields) {
      if (!data.contactDetails.mailingAddress[field]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: [`contactDetails.mailingAddress.${field}`]
        })
      }
    }
  }
})

type SchemaType = z.infer<typeof schema>

  export { schema, type SchemaType }