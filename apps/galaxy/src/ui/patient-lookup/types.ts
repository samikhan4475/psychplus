import type {
  ContactDetails,
  Gender,
  LegalName,
  Metadata,
  PatientProfile,
} from '@/types'
import { InsurancePolicyPriority } from '../patient-info/insurance-tab/constants'
import { PatientLookUpSchemaType } from './patient-filter-form'

enum QueryByNextDays {
  NoVisits = 'NoVisits',
  Disregard = 'Disregard',
}

enum ReferralSource {
  Hospital = 'Hospital',
}

interface PatientRaw {
  id: number
  metadata: Metadata
  legalName: LegalName
  contactDetails: ContactDetails
  birthdate: string
  gender: Gender
}

interface Patient extends PatientProfile {
  name: string
  age: number
  mrn: string
  dob: string
  phoneNumber?: string
  residence?: string
  city?: string
  zip?: string
  postalPlus4Code?: string
  state?: string
  userCreated?: string
  insurance?: string
  mostRecentAppointmentId?: number
}

interface SearchPatientsData {
  patients: Patient[]
  total: number
}

interface SearchPatientsParams
  extends Omit<
    PatientLookUpSchemaType,
    | 'patientCreatedFrom'
    | 'patientCreatedTo'
    | 'dateOfBirth'
    | 'hasGuardian'
    | 'contactMadeStatuses'
  > {
  patientCreatedFrom?: string
  patientCreatedTo?: string
  dateOfBirth?: string
  hasGuardian?: boolean
  consentVerificationStatuses?: string[]
  creditCardVerificationStatuses?: string[]
  insurancePriority?: InsurancePolicyPriority
  contactMadeStatuses?: string[]
}

interface SortCodesetOptions {
  includeDisabled?: boolean
}
export {
  QueryByNextDays,
  ReferralSource,
  type Patient,
  type PatientRaw,
  type SearchPatientsData,
  type SearchPatientsParams,
  type SortCodesetOptions,
}
