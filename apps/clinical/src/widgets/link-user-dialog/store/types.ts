import { CodeSetState } from '@psychplus/codeset'
import { Patient } from '@psychplus/patient'
import { Dropdown } from '@/widgets/patient-lookup/store'

interface Filters {
  firstNameContains: string
  lastNameContains: string
  mrn: string
  dateOfBirth: Date | null | string
  telephone: string
}

interface PatientFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface PatientState extends CodeSetState {
  patients: Patient[]
  setPatients: (value: Patient[]) => void
  getDropdowns: (key: string) => Dropdown
}

interface PreferredPartnerIdState {
  preferredPartnerId: string
  setPreferredPartnerId: (value: string) => void
}

export type {
  PatientState,
  PatientFiltersState,
  Filters,
  PreferredPartnerIdState,
}
