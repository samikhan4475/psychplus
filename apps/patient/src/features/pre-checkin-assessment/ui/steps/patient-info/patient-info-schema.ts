import { getAgeFromDate } from '@psychplus-v2/utils'
import z from 'zod'
import { addressSchema } from '@/features/account/profile/ui/account-profile-view/address-card/address-schema'
import { schema } from '@/features/account/profile/ui/account-profile-view/personal-info-card/schema'

type patientSchemaType = z.infer<typeof patientSchema>

const genderSchema = z.object({
  gender: z.string().trim().min(1, 'Required'),
})

const baseSchema = z.object({
  ...schema._def.schema.shape,
})

const patientSchema = baseSchema
  .omit({
    driversLicense: true,
  })
  .and(addressSchema)
  .and(genderSchema)
  .superRefine((data, ctx) => {
    const age = getAgeFromDate(data.birthdate)

    // Age-related validations
    if (age < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be at least 4 years of age',
        path: ['birthdate'],
      })
    } else if (age > 120) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be 120 years of age or less',
        path: ['birthdate'],
      })
    }

    if (age < 18 && !data.hasGuardian) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'You must have a guardian if you are under 18',
        path: ['hasGuardian'],
      })
    }

    // Guardian-related validations
    if (data.hasGuardian) {
      const requiredGuardianFields = ['guardianFirstName', 'guardianLastName']
      requiredGuardianFields.forEach((field) => {
        if (!data[field as keyof typeof data]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: [field],
          })
        }
      })
    }

    // Secondary address validations
    if (!data.isMailingAddressSameAsPrimary) {
      const requiredAddressFields = [
        'secondaryStreet1',
        'secondaryCity',
        'secondaryState',
        'secondaryPostalCode',
      ]

      requiredAddressFields.forEach((field) => {
        if (!data[field as keyof typeof data]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: [field],
          })
        }
      })
    }
  })

export { patientSchema, type patientSchemaType }
