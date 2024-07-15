'use client'

import { z } from 'zod'
import { getBirthyear } from '../utils'

const schema = z
  .object({
    firstName: z.string().trim().min(1, 'Required'),
    lastName: z.string().trim().min(1, 'Required'),
    middleName: z.string().optional(),
    birthdate: z.string().trim().min(1, 'Required'),
    phoneNumber: z.string().trim().length(10, 'Invalid phone number'),
    email: z.string().email().trim(),
    socialSecurityNumber: z.string().trim().length(9, 'Invalid SSN'),
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
    if (getBirthyear(data.birthdate) < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Age can't be less than 5 years!",
        path: ['birthdate'],
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
