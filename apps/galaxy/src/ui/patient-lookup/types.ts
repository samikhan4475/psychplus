import type {
  ContactDetails,
  Gender,
  GenderAbbreviation,
  LegalName,
  Metadata,
} from '@/types'

interface PatientRaw {
  id: number
  metadata: Metadata
  legalName: LegalName
  contactDetails: ContactDetails
  birthdate: string
  gender: Gender
}

interface Patient {
  id: string
  mrn: string
  firstName: string
  lastName: string
  dob: string
  age: number
  email: string
  address?: string
  gender: GenderAbbreviation
}

interface SearchPatientsData {
  patients: Patient[]
  total: number
}

export type { Patient, PatientRaw, SearchPatientsData }
