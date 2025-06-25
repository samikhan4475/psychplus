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
  zipLast4?: string
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
  requestedProviderName?: string
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
      zipLast4?: string
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
export {
  QueryByNextDays,
  type Patient,
  type SearchPatientsData,
  type SearchPatientsParams,
  type SortCodesetOptions,
}
