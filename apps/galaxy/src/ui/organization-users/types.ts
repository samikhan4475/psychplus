import { ContactDetails, Insurance, LegalName, Metadata } from '@/types'

interface Users {
  id: number
  userHistory?: string
  name?: string
  status?: string
  verificationStatus?: string
  patientVerificationTimeElapsed?: string
  insuranceVerification?: string
  insuranceVerificationTimeElapsed?: string
  patientConsent?: string
  creditCardVerificationStatus?: string
  age?: number
  birthdate: string
  gender?: string
  mrn?: string
  referralDate?: string
  dob?: string | null
  phoneNumber?: string
  socialSecurityNumber?: string
  contactDetails: Partial<ContactDetails>
  comments?: string
  residence?: string
  city?: string
  zip?: string
  hasGuardian?: boolean
  organization?: string
  practice?: string
  practiceId?: string
  insurancePolicies?: Insurance[]
  userCreated?: string
  upcomingAppointmentDate?: string | null
  contactInitiated?: string
  createdBy?: string
  mostRecentAppointmentDate?: string
  service?: string
  legalName: LegalName
  servicesStatus?: string
  referredByName?: string
  visitDateTime?: string
  ptVerification?: string
  updatedDate?: string
  updatedBy?: string
  metadata?: Metadata
  contactMadeStatus?: string
}
interface UsersSearchParam {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  age?: string
  gender?: string
  name?: string
  mrn?: string
  dateOfBirth?: string
  city?: string
  postalCode?: string
  hasGuardian?: string
  telephone?: string
  consentVerificationStatuses?: []
  creditCardVerificationStatuses?: []
  patientCreatedFrom?: string
  patientCreatedTo?: string
  ssn?: string
  verificationStatuses?: []
  patientStatuses?: []
  practices?: []
  insuranceVerificationStatuses?: []
  visitHistoryPastDays?: string
  futureVisitsByDays?: string
  nextVisitStatus?: string
  pastVisitStatus?: string
  contactMadeStatuses?: string
  insurancePolicyIds?: []
  organizations?: []
  metadata?: Metadata
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludeTestPatients?: boolean
  isIncludeInsurance?: boolean
  isIncludeInsuranceVerification?: boolean
  isIncludeCardVerification?: boolean
  isIncludeConsentVerification?: boolean
  isIncludeMostUpcomingAppointment?: boolean
  isIncludeMostRecentAppointment?: boolean
  organizationIds?: [string]
  practiceId?: string
}
export type { Users, UsersSearchParam }
