export interface Immunization {
  id: string
  metadata: string
  name: string
  individualRate: number
  coupleRate: number
  familyRate: number
  subscriptionStatus: string
  payerStatus: string
  billingFrequency: string
  plusChargeAmount: number
  serviceChargeAmount: number
  startDate: string
  nextPaymentDate: string
  contactDetails: string
  recordStatus: string
  isTest: boolean
}

export const requestBody = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeMetadataPermissions: true,
  isIncludeCodesets: true,
  isIncludeCodes: true,
  isIncludeCodeAttributes: true,
  namespace: 'CDC',
  recordStatuses: ['Active'],
}

export enum ImmunizationTypeEnum {
  Administered = 'administered',
  Refusal = 'refusal',
  Historical = 'historical',
}

export const completionStatusCode = [
  { value: 'CP', label: 'Complete' },
  { value: 'PA', label: 'Partially Administered' },
  { value: 'NA', label: 'Not Administered' },
]

export type OptionType = {
  label: string
  value: string
}
