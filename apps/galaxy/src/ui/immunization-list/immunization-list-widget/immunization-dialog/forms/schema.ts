import z from 'zod'

const baseImmunizationSchema = z.object({
  id: z.string().optional(),
  cvxCode: z.string().min(1, 'Required'),
  mvxCode: z.string().min(1, 'Required'),
  cvxDescription: z.string().optional(),
  mvxDescription: z.string().optional(),
  datetimeAdministered: z.string().min(1, 'Required'),
  administeredCode: z.string().optional(),
  fundingCode: z.string().optional(),
  fundingClass: z.string().optional(),
  dose: z.string().optional(),
  units: z.string().optional(),
  lotNumber: z.string().optional(),
  expirationDate: z.string().optional(),
  routeCode: z.string().optional(),
  siteCode: z.string().optional(),
  providerStaffId: z.string().optional(),
  administeringUserId: z.string().min(1, 'Required'),
  ndcCode: z.string().optional(),
  administeringUserFullName: z.string().optional(),
  vaccineFPE: z.string().optional(),
  manufactureDescription: z.string().min(1, 'Required'),
  manufacturInformation: z.string().optional(),
  completionStatusCode: z.string().optional(),
})

export const administeredSchema = baseImmunizationSchema.extend({
  entryType: z.literal('Administered'),
})

export const historicalSchema = z.object({
  id: z.string().optional(),
  cvxCode: z.string().min(1, 'Required'),
  cvxDescription: z.string().optional(),
  informationCode: z.string().optional(),
  datetimeAdministered: z.string().min(1, 'Required'),
  mvxCode: z.string().optional(),
  mvxDescription: z.string().optional(),
  manufactureDescription: z.string().optional(),
  entryType: z.literal('Historical'),
  ndcCode: z.string().optional(),
  completionStatusCode: z.string().optional()
})

export const refusalSchema = z.object({
  id: z.string().optional(),
  cvxCode: z.string().min(1, 'Required'),
  cvxDescription: z.string().optional(),
  reasonCode: z.string().optional(),
  mvxCode: z.string().optional(),
  datetimeAdministered: z.string().min(1, 'Required'),
  entryType: z.literal('Refusal'),
  mvxDescription: z.string().optional(),
  manufactureDescription: z.string().optional(),
  ndcCode: z.string().optional(),
  completionStatusCode: z.string().optional()
})

export const immunizationSchema = z.discriminatedUnion('entryType', [
  administeredSchema,
  historicalSchema,
  refusalSchema,
])

export type AdministeredSchemaType = z.infer<typeof administeredSchema>
export type HistoricalSchemaType = z.infer<typeof historicalSchema>
export type RefusalSchemaType = z.infer<typeof refusalSchema>
export type ImmunizationSchemaType = z.infer<typeof immunizationSchema>
export type BaseImmunizationSchemaType = z.infer<typeof baseImmunizationSchema>
