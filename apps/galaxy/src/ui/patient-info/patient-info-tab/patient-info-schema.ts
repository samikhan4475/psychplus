import { z } from 'zod'

const patientAddressTypeEnum = z.enum([
  'Home',
  'Business',
  'Mailing',
  'Billing',
])
const phoneNumberTypeEnum = z.enum(['Contact', 'Home', 'Business'])
const nameRegex = /^[^\d]*$/
const phoneExtensionRegex = /^\d*$|^$/
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
const optionalName = z
  .string()
  .regex(nameRegex, 'Numbers are not allowed')
  .max(35, { message: 'Cannot exceed 35 characters' })
  .optional()
const phoneRegex = /^(\+?[1-9]\d{9}|^$)$/
const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const phoneExtension = z
  .string()
  .regex(phoneExtensionRegex, 'Invalid extension')
  .max(4, 'Cannot exceed 4 digits')
  .optional()
const requiredPhone = requiredString.regex(phoneRegex, 'Invalid phone number')
const emptyOrStringArray = z
  .array(z.string())
  .refine((value) => value.every((item) => typeof item === 'string'), {
    message: 'Array must be empty or contain only strings',
  })

const zipCodeValidation = z
  .string()
  .regex(zipCodeRegex, 'Invalid zip code!')
  .optional()
  .default('')
const optionalPhoneValidation = z
  .string()
  .regex(phoneRegex, 'Invalid phone number')
  .optional()
  .default('')

function validatePatientAddress(
  data: z.infer<typeof patientInfoSchema>,
  ctx: z.RefinementCtx,
) {
  if (!data.contactDetails.isMailingAddressSameAsPrimary) {
    const mailingAddressFields: (keyof typeof data.contactDetails.mailingAddress)[] =
      ['street1', 'city', 'state', 'postalCode']

    for (const field of mailingAddressFields) {
      if (!data.contactDetails.mailingAddress[field]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: [`contactDetails.mailingAddress.${field}`],
        })
      }
    }
  }
}

const patientInfoSchema = z
  .object({
    id: z.number(),
    legalName: z.object({
      firstName: requiredName,
      lastName: requiredName,
      middleName: optionalName.default(''),
      preferredName: optionalName.default(''),
      title: optionalName.default(''),
      suffix: optionalName.default(''),
      honors: optionalString,
    }),
    birthdate: requiredString,
    isTest: z.boolean().optional(),
    hasGuardian: z.boolean(),
    gender: z.string(),
    genderOrientation: z.string().optional(),
    genderExpression: z.string().optional(),
    genderPronoun: z.string().optional(),
    driversLicense: z
      .object({
        type: z.string().optional().default('DriversLicense'),
        number: requiredString,
        validIn: requiredString,
        hasFrontImage: z.boolean(),
        hasBackImage: z.boolean().optional(),
      })
      .optional(),
    contactDetails: z.object({
      email: requiredString.email(),
      homeNumber: z.object({
        type: phoneNumberTypeEnum.optional().default('Home'),
        number: optionalPhoneValidation,
        extension: phoneExtension.default(''),
        comment: optionalString,
      }),
      workNumber: z.object({
        type: phoneNumberTypeEnum.optional().default('Business'),
        number: optionalPhoneValidation,
        extension: phoneExtension.default(''),
        comment: optionalString,
      }),
      mobileNumber: z.object({
        type: phoneNumberTypeEnum.default('Contact'),
        number: requiredPhone,
        extension: phoneExtension.default(''),
        comment: optionalString,
      }),
      homeAddress: z.object({
        type: patientAddressTypeEnum.default('Home'),
        street1: requiredString,
        street2: optionalString,
        city: requiredString,
        state: requiredString,
        country: requiredString.default('US'),
        postalCode: zipCodeValidation,
      }),
      mailingAddress: z.object({
        type: patientAddressTypeEnum.default('Home'),
        street1: optionalString,
        street2: optionalString,
        city: optionalString,
        state: optionalString,
        country: optionalString,
        postalCode: zipCodeValidation,
      }),
      isMailingAddressSameAsPrimary: z.boolean().optional(),
    }),
    cmdId: z
      .string()
      .max(128, { message: 'Cannot exceed 128 characters' })
      .optional(),
    motherMaidenName: optionalName,
    alternateOrPreviousName: z
      .object({
        firstName: optionalName.default(''),
        lastName: optionalName.default(''),
        middleName: optionalName.default(''),
        preferredName: optionalName.default(''),
        title: optionalName.default(''),
        suffix: optionalName.default(''),
        honors: optionalString,
      })
      .nullable()
      .default(null),
    alternateOrPreviousContactDetails: z
      .object({
        homeAddress: z.object({
          type: patientAddressTypeEnum.default('Home'),
          street1: optionalString,
          street2: optionalString,
          city: optionalString,
          state: optionalString,
          country: optionalString,
          postalCode: zipCodeValidation,
        }),
      })
      .nullable(),
    language: z.string().optional(),
    languageAbility: optionalString,
    languageProficiency: optionalString,
    religion: optionalString,
    races: emptyOrStringArray,
    ethnicities: emptyOrStringArray,
    preferredLanguage: z.string().optional(),
    chargeUserId: optionalString,
    isPlusMember: z.boolean(),
    hasPhoto: z.boolean(),
    chargeKey: optionalString,
    medicalRecordNumber: optionalString,
    socialSecurityNumber: z.ostring().refine(
      (val) => {
        if (!val) return true
        return val.replace(/[-,_]/g, '').length === 9
      },
      { message: 'Must be 9 digits' },
    ),
    guardian: z
      .object({
        name: z.object({
          firstName: optionalName.default(''),
          lastName: optionalName.default(''),
        }),
      })
      .optional(),
    verificationStatus: optionalString,
    status: optionalString,
  })
  .superRefine((data, ctx) => {
    const hasFirstNameWithNoLastName =
      data.alternateOrPreviousName?.firstName &&
      !data.alternateOrPreviousName?.lastName
    const hasLastNameWithNoFirstName =
      data.alternateOrPreviousName?.lastName &&
      !data.alternateOrPreviousName?.firstName
    const hasHomeCommentsExtWithNoNumber =
      !data.contactDetails.homeNumber.number &&
      (data.contactDetails.homeNumber.comment ||
        data.contactDetails.homeNumber.extension)
    const hasWorkCommentsExtWithNoNumber =
      !data.contactDetails.workNumber.number &&
      (data.contactDetails.workNumber.comment ||
        data.contactDetails.workNumber.extension)
    // alternateOrPreviousName validations
    if (hasFirstNameWithNoLastName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: [`alternateOrPreviousName.lastName`],
      })
    } else if (hasLastNameWithNoFirstName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: [`alternateOrPreviousName.firstName`],
      })
    }

    // additionalContactInfo validations
    if (hasHomeCommentsExtWithNoNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['contactDetails.homeNumber.number'],
      })
    }

    if (hasWorkCommentsExtWithNoNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
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
            path: [`guardian.name.${field}`],
          })
        }
      }
    }
    // patientAddress validations
    validatePatientAddress(data, ctx)
  })

type PatientInfoSchemaType = z.infer<typeof patientInfoSchema>

export { patientInfoSchema, type PatientInfoSchemaType }
