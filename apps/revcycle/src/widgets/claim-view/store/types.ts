import { Claim } from '../types'

interface Filters {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientId?: number
  insuranceId?: string
  claimId?: string
  locationId?: string
  dateType?: string
  fromDate?: Date
  toDate?: Date
  isIncludePatientInsurancePlan?: boolean
}

interface ClaimFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface ClaimListState {
  claimList: Claim[]
  setClaimList: (value: Claim[]) => void
}

interface DateTypeOption {
  value: string
  label: string
}

interface InsurancePayerOption {
  value: string
  label: string
}

interface LocationOption {
  value: string
  label: string
}

interface CodeSetsState {
  insurancePayersList: InsurancePayerOption[]
  setInsurancePayersList: (value: InsurancePayerOption[]) => void
  locations: LocationOption[]
  setLocations: (value: LocationOption[]) => void
  dateTypes: DateTypeOption[]
  setDateTypes: (value: DateTypeOption[]) => void
}

interface ErrorMessage {
  id: string
  claimId: string
  errorMessage: string
}

interface ClaimSubmission {
  selectedClaims: string[]
  claimsWithErrorMessages: {
    [claimId: string]: ErrorMessage[]
  }
  cleanClaimIds: string[]
  submissionType: string
}

interface ClaimSubmissionState {
  claimSubmissionData: ClaimSubmission
  setClaimSubmissionData: (value: ClaimSubmission) => void
  claimSubmissionModal: boolean
  setClaimSubmissionModal: (value: boolean) => void
  claimSubmissionDetailModal: boolean
  setClaimSubmissionDetailModal: (value: boolean) => void
  selectedClaim: string
  setSelectedClaim: (value: string) => void
}

export type {
  ClaimFiltersState,
  ClaimListState,
  Filters,
  Claim,
  CodeSetsState,
  ClaimSubmissionState,
}
