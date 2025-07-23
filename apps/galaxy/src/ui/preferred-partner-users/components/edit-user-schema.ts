import { DateValue } from '@internationalized/date'
import { z } from 'zod'
import { PP_USER_TYPES } from '../constants'

const phoneRegex = /^\+?[1-9]\d{7,14}$/

export const familyMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dob: z
    .custom<DateValue>()
    .refine((val) => val !== null && val !== undefined, {
      message: 'Date of birth is required',
    }),
  ssn: z.string().min(1, 'SSN is required'),
  phone: z.string().min(1, 'Phone is required').regex(phoneRegex, 'Invalid phone number'),
  email: z.string().min(1, 'Email is required'),
  address: z.string().min(1, 'Address is required'),
  street2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  postalPlus4Code: z.string().optional(),
  country: z.string().optional().default('US'),
})

export const createEditUserSchema = (originalUserType: string) => {
  return z
    .object({
      firstName: z.string().min(1, 'First name is required'),
      middleName: z.string().optional(),
      lastName: z.string().min(1, 'Last name is required'),
      gender: z.string().min(1, 'Gender is required'),
      dob: z
        .custom<DateValue>()
        .refine((val) => val !== null && val !== undefined, {
          message: 'Date of birth is required',
        }),
      ssn: z.string().optional(),
      userStatus: z.string().min(1, 'User status is required'),
      phone: z.string().optional(),
      ppUserId: z.string().min(1, 'PP User ID is required'),
      ppUserType: z.string().min(1, 'PP User Type is required'),
      partnerUserId: z.string().optional(),
      selectedPartnerId: z.string().optional(),
      ppUserStatus: z.string().min(1, 'PP User Status is required'),
      startDate: z.string().optional(),
      email: z.string().optional(),
      uploadStatus: z.string().optional(),
      address: z.string().optional(),
      usersInId: z.string().optional(),
      familyMembers: z.array(familyMemberSchema).optional(),
    })
    .superRefine((data, ctx) => {
      if (
        originalUserType === PP_USER_TYPES.INDIVIDUAL &&
        data.ppUserType === PP_USER_TYPES.COUPLE &&
        (!data.selectedPartnerId || data.selectedPartnerId.trim() === '')
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Partner User ID is required when selecting Couple type',
          path: ['selectedPartnerId'],
        })
      }

      if (
        originalUserType === PP_USER_TYPES.INDIVIDUAL &&
        data.ppUserType === PP_USER_TYPES.FAMILY &&
        (!data.selectedPartnerId || data.selectedPartnerId.trim() === '')
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Family Member is required when selecting Family type',
          path: ['selectedPartnerId'],
        })
      }
    })
}

export const editUserSchema = createEditUserSchema(PP_USER_TYPES.INDIVIDUAL)

export type FamilyMemberSchemaType = z.infer<typeof familyMemberSchema>
export type EditUserSchemaType = z.infer<
  ReturnType<typeof createEditUserSchema>
>
