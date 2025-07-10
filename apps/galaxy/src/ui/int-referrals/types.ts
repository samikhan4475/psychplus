import { DateValue } from '@internationalized/date'
import type {
  ContactDetails,
  Gender,
  LegalName,
  Metadata,
  PatientProfile,
  PatientReferral,
} from '@/types'
import { InsurancePolicyPriority } from '../patient-info/insurance-tab/constants'
import { IntReferralsPatientLookUpSchemaType } from './int-patient-filter-form'

enum QueryByNextDays {
  NoVisits = 'NoVisits',
  Disregard = 'Disregard',
}

enum VisitTypes {
  ExposureResponseTherapy = 'Exposure Response Therapy',
  SPRAVATO = 'Spravato',
}

enum referralServiceType {
  OCD = 'OCD',
  ReferrerShortName = 'Nocd',
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
  referredByName: {
    firstName: string
    lastName: string
  }
  visitDateTime: string
  email: string
  visitId: string
  organization: string
  nextVisit: string
  visitHistory: string
  phone: string
  patientStatus: string
  patientName: {
    firstName: string
    lastName: string
  }
  service: string
  serviceDate: string
  VisitID: string
  InitiatedBy: string
  provider: string
  practice: string
  comments: string
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
}

interface SearchPatientsData {
  patients: Patient[]
  total: number
}

interface SearchPatientsParams
  extends Omit<
    IntReferralsPatientLookUpSchemaType,
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

interface GetPatientReferralsResponse {
  referrals: PatientReferral[]
  total?: number
}

interface GetPatientReferralsParams {
  patientIds: string[]
  payload: Partial<PatientReferralsPayload>
  page?: number
}

interface PatientReferralsPayload {
  dateOfBirth: DateValue | null
  contactMadeStatuses: string[]
  servicesOfferedList: string[]
  contactStatusList: string[]
  resourceStatusList: string[]
  fromReferralDate: string
  toReferralDate: string
}

export {
  QueryByNextDays,
  VisitTypes,
  referralServiceType,
  type Patient,
  type PatientRaw,
  type SearchPatientsData,
  type SearchPatientsParams,
  type GetPatientReferralsResponse,
  type GetPatientReferralsParams,
  type PatientReferralsPayload,
}
