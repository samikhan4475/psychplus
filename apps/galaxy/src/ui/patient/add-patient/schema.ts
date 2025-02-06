import { getLocalTimeZone, today } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const phoneRegex = /^(\+?[1-9]\d{9}|^$)$/
const nameRegex = /^[^\d]*$/
const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const INVALID_DATE_MESSAGE = 'Invalid date of birth'
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

const addressSchema = z.object({
  type: z.string(),
  street1: optionalString,
  street2: optionalString,
  city: optionalString,
  state: optionalString,
  country: optionalString,
  postalCode: z
    .string()
    .trim()
    .regex(zipCodeRegex, 'Invalid zip code!')
    .optional()
    .default(''),
})
const ContactInfoSchema = z.object({
  addresses: z.array(addressSchema),
  isMailingAddressSameAsPrimary: z.string(),
})

const NameSchema = z.object({
  firstName: requiredName,
  middleName: optionalString,
  lastName: requiredName,
})

const schema = z
  .object({
    legalName: NameSchema,
    contactInfo: ContactInfoSchema,
    gender: requiredString,
    dateOfBirth: z
      .custom<DateValue>()
      .refine((val) => val !== null && val !== undefined, {
        message: 'Required',
      }),
    phoneNumber: z
      .string()
      .min(1, 'Required')
      .regex(phoneRegex, 'Invalid phone number'),
    email: z.string().min(1, 'Required').email('Invalid email address'),
    hasGuardian: z.string(),
    guardianFirstName: z
      .string()
      .optional()
      .refine(
        (val) => val !== undefined && nameRegex.test(val),
        'Cannot contain numbers',
      ),
    guardianLastName: z
      .string()
      .optional()
      .refine(
        (val) => val !== undefined && nameRegex.test(val),
        'Cannot contain numbers',
      ),
    relationship: z.string().optional(),
    patientPolicyA: z.boolean().optional(),
    patientPolicyB: z.boolean().optional(),
    isTest: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const { dateOfBirth } = data
    if (data.hasGuardian === 'yes') {
      if (!data.guardianFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['guardianFirstName'],
        })
      }
      if (!data.guardianLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['guardianLastName'],
        })
      }
      if (!data.relationship) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['relationship'],
        })
      }
    }
    if (dateOfBirth && today(getLocalTimeZone()).compare(dateOfBirth) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_DATE_MESSAGE,
        path: ['dateOfBirth'],
      })
    }
    if (dateOfBirth && dateOfBirth.year < 1900) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_DATE_MESSAGE,
        path: ['dateOfBirth'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
