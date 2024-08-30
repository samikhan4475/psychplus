import { ClaimServiceLine } from '../components/claim-form/types'
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
interface PhoneNumber {
  type: string
  number: string
}
interface Contact {
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
}

interface Address {
  type: 'Home' | 'Mailing'
  street1?: string
  street2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  geoCoordinates?: {
    longitude?: number
    latitude?: number
    altitude?: number
  }
}
interface LocationOption {
  value: string
  label: string
  npi?: string
  contact?: Contact
}

interface CodeSetsState {
  insurancePayersList: InsurancePayerOption[]
  setInsurancePayersList: (value: InsurancePayerOption[]) => void
  locations: LocationOption[]
  setLocations: (value: LocationOption[]) => void
  dateTypes: DateTypeOption[]
  setDateTypes: (value: DateTypeOption[]) => void
}

interface Tab {
  id: string
  label: string
  claimId?: string
  claimNumber?: string
}

interface TabsStore {
  tabs: Tab[]
  activeTabId: string
  addTab: (tab: Tab) => void
  setActiveTab: (tabId: string) => void
  selectedClaimId: string
  selectedClaimBilledAmt: number
  deletedClaimServiceLines: ClaimServiceLine[];
  setDeletedClaimServiceLines: (newLine: ClaimServiceLine) => void;
  setSelectedClaim: (selectedClaimId: string) => void
  setSelectedClaimBilledAmt: (selectedClaimBilledAmt: number) => void
  removeTab: (tabId: string) => void
}

// Initial tabs for default setup
export const initialTabs: Tab[] = [
  { id: 'claimstable', label: 'Claims' },
  { id: 'submission', label: 'Submission' },
  { id: 'ins-payment', label: 'Ins Payment' },
  { id: 'patient-payment', label: 'Patient Payment' },
  { id: 'patient-statement', label: 'Patient Statement' },
]

interface MetaDataCodeSet {
  code: string
  display: string
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
  Tab,
  TabsStore,
  MetaDataCodeSet,
  CodeSetsState,
  ClaimSubmissionState,
}
