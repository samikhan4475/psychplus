'use client'

import { requiredName } from '@/features/utils'
import { getAgeFromDate } from '@psychplus-v2/utils'
import { z } from 'zod'

const schema = z
  .object({
    firstName: requiredName,
    lastName: requiredName,
    middleName: z.string().optional(),
    birthdate: z.string().trim().min(1, 'Required'),
    phoneNumber: z
      .string()
      .trim()
      .min(1, 'Required')
      .length(10, 'Invalid phone number'),
    email: z.string().email().trim(),
    socialSecurityNumber: z.string().optional(),
    medicalRecordNumber: z.string().optional(),
    cmdId: z.string().optional(),
    status: z.string().optional(),
    driversLicense: z
      .object({
        type: z.string().trim().default('DriversLicense'),
        validIn: z.string().trim().min(1, 'Required'),
        hasFrontImage: z.boolean(),
        number: z.string().trim().min(1, 'Required'),
      })
      .optional(),
    hasGuardian: z.boolean(),
    guardianFirstName: z.string().optional(),
    guardianLastName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (getAgeFromDate(data.birthdate) < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be at least 4 years of age',
        path: ['birthdate'],
      })
    }

    if (getAgeFromDate(data.birthdate) > 120) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be 120 years of age or less',
        path: ['birthdate'],
      })
    }

    if (getAgeFromDate(data.birthdate) < 18 && !data.hasGuardian) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'You must have a guardian if you are under 18',
        path: ['hasGuardian'],
      })
    }

    if (data.hasGuardian) {
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
    }
  })

export { schema }
