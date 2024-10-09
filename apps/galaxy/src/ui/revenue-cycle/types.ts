import { Claim } from '@/types'

enum RevenueCycleTab {
  Claim = 'Claim',
  Submission = 'Submission',
  ResponseHistory = 'Response History',
  InsurancePayment = 'Ins. Payment',
  PatientStatement = 'Patient Statement',
  ClaimDetails = 'Claim#',
  CheckDetails = 'Check#',
}

interface GetClaimsListResponse {
  claims: Claim[]
  total: number
}

interface ClaimListSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientId?: number
  insuranceId?: string
  claimId?: string
  locationId?: string
  dateType?: string
  isIncludePatientInsurancePlan?: boolean
  receiverName?: string
}

export {
  RevenueCycleTab,
  type ClaimListSearchParams,
  type GetClaimsListResponse,
}
