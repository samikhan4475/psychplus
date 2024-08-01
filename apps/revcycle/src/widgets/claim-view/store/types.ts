import { Claim } from '../types'

interface Filters {
  isIncludeMetadataResourceChangeControl: boolean
  isIncludeMetadataResourceIds: boolean
  isIncludeMetadataResourceStatus: boolean
  patientId: number
  insuranceId: string
  claimId: string
  locationId: string
  dateType: string
  fromDate: Date | undefined
  toDate: Date | undefined
  isIncludePatientInsurancePlan: boolean
}

interface ClaimFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface ClaimListState {
  claimList: Claim[]
  setClaimList: (value: Claim[]) => void
}

export type { ClaimFiltersState, ClaimListState, Filters, Claim }
