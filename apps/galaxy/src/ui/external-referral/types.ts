import type {
  ContactDetails,
  Gender,
  LegalName,
  Metadata,
  PatientProfile,
} from '@/types'
import { InsurancePolicyPriority } from '../patient-info/insurance-tab/constants'
import { ExternalReferralSchemaType } from './external-referral-filter-form'

enum QueryByNextDays {
  NoVisits = 'NoVisits',
  Disregard = 'Disregard',
}

interface Patient extends PatientProfile {
  name: string
  age: number
  patientExternalMrn: string
  patientDateOfBirth: string
  phoneNumber?: string
  residence?: string
  city?: string
  zip?: string
  postalPlus4Code?: string
  state?: string
  userCreated?: string
  insurance?: string
  mostRecentAppointmentId?: number
  service?: string
  serviceDateTime?: string
  requestDate?: string
  requestTime?: string
  requestedMedium?: string
  requestClinicLocation?: string
  requestedProviderName?: LegalName
  referrerName?: string
  referralPhone?: string
  referralEmail?: string
  dischargeTime?: string
  facesheet?: string
  dischargeSummary?: string
  upcomingAppointmentDate?: string
  isLinked?: boolean
  patientName: LegalName
  matchStatus?: string
  patientContactDetails?: PatientContactDetails
  requestedService?: string
  requestedServiceDateTime?: string
  requestedTime?: string
  referrerContactDetails?: PatientContactDetails
  requestedStateCode?: string
  patientGender?: string
  contactStatus?: string
  organizationType?: string
  organizationName?: string
  referrerFacility?: string
  additionalComments?: string
  insuranceType?: string
  referrerStatus?: string
  requestedLocationName?: string
  patientEducation?: string
  primaryInsurance?: string
  secondaryInsurance?: string
  authStatus?: string
  diagnosis?: string
  servicePriorityStatus?: string
  initiatedBy?: string
  orderingProvider?: string
  pAndC?: string
  cc?: string
  attachments?: Attachment[]
}

interface SearchPatientsData {
  patients: Patient[]
  total: number
}

interface PatientContactDetails {
  email: string
  emailVerificationStatus: string
  phoneNumbers: [
    {
      type: string
      number: string
      extension: string
      comment: string
    },
  ]
  addresses: [
    {
      type: string
      street1: string
      street2: string
      city: string
      state: string
      country: string
      postalCode: string
      postalPlus4Code?: string
      geoCoordinates?: {
        longitude: number
        latitude: number
        altitude: number
      }
      timeZoneId: string
    },
  ]
  isMailingAddressSameAsPrimary: boolean
}

interface SearchPatientsParams
  extends Omit<
    ExternalReferralSchemaType,
    | 'patientCreatedFrom'
    | 'patientCreatedTo'
    | 'patientDateOfBirth'
    | 'hasGuardian'
    | 'contactMadeStatusList'
  > {
  patientCreatedFrom?: string
  patientCreatedTo?: string
  patientDateOfBirth?: string
  hasGuardian?: boolean
  consentVerificationStatuses?: string[]
  creditCardVerificationStatuses?: string[]
  insurancePriority?: InsurancePolicyPriority
  contactMadeStatusList?: string[]
}

interface SortCodesetOptions {
  includeDisabled?: boolean
}
interface Location {
  type: string
  street1: string
  street2: string
  city: string
  stateCode: string
  countryCode: string
  postalCode: string
  postalPlus4Code: string
  longitude: number
  latitude: number
  altitude: number
  timeZoneId: string
}

interface MatchDetail {
  field: string
  scoreAdjustment: number
}

interface Match {
  matchScore: number
  userId: number
  socialSecurityNumber: string
  patientId: number
  recordStatus: string
  isTestPatient: boolean
  name: LegalName
  dateOfBirth: string
  gender: string
  email: string
  phoneNumber: string
  location: Location
  matchDetails: MatchDetail[]
  pAndC?: string
  cc?: string
  patientExternalMrn?: string
  primaryInsurance?: string
  createdOn?: string
  createdBy?: string
  mostRecentAppointmentDate?: string
  upcomingAppointmentDate?: string
}

interface MatchingPatient {
  matchStatus: string
  matches: Match[]
}
interface Attachment {
  id: string
  metadata?: Metadata
  recordStatus: string
  documentType: string
  isHasDocumentDownload: boolean
}
export {
  QueryByNextDays,
  type Patient,
  type SearchPatientsData,
  type SearchPatientsParams,
  type SortCodesetOptions,
  type MatchingPatient,
  type Match,
}
