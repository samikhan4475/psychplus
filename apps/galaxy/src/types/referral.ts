import { Insurance } from './insurance'
import { Metadata } from './metadata'
import { LegalName } from './name'

enum ContactMadeStatuses {
  NotSet = 'NotSet',
  Pending = 'Pending',
  AuthInProcess = 'AuthInProcess',
  AttemptedContact = 'AttemptedContact',
  Refused = 'Refused',
  Scheduled = 'Scheduled',
  Cancelled = 'Cancelled',
  Admitted = 'Admitted',
  SecondAttempt = 'SecondAttempt',
  ThirdAttempt = 'ThirdAttempt',
  Error = 'Error',
}

enum ReferralStatuses {
  Deleted = 'Deleted',
  Incomplete = 'Incomplete',
  Completed = 'Completed',
  Pending = 'Pending',
  Unsigned = 'Unsigned',
}
interface PatientReferral {
  patientInsurancePolicies?: Insurance[]
  insurancePolicies: []
  appointmentId?: string
  patientMrn?: string
  patientAge?: number
  patientGender?: string
  contactDetails?: {
    email: string
    phoneNumbers?: Array<{
      type: string
      number: string
    }>
  }
  id: number
  metadata?: Metadata
  patientId: number
  patientName: LegalName
  patientStatus: string
  patientDateOfBirth?: string
  referralDate?: string
  resourceStatus?: string
  referredByType?: string
  referredByName: LegalName
  service: string
  gender: string
  dateOfBirth: string
  servicesStatus: string
  contactStatus: string
  visitDateTime?: string
  comments: string
  email: string
  organization: string
  visitHistory: string
  phone: string
  serviceDate: string
  InitiatedBy: string
  practice: string
  name: string
  age: number
  mrn: string
  dob: string
  phoneNumber?: string
  residence?: string
  city?: string
  zip?: string
  zipLast4?: string
  state?: string
  userCreated?: string
  insurance?: string
  visitId?: string
  nextVisit?: string
  patientVisitHistory?: string
  intiatedByUserRole?: string
  stateCode?: string
}

interface GetPatientReferralsParams {
  patientIds: string[]
  payload?: Partial<{
    servicesOfferedList: string[]
    contactStatusList: string[]
    resourceStatusList: string[]
    fromReferralDate: string
    toReferralDate: string
  }>
  page?: number
  tags?: string[]
}

export {
  type PatientReferral,
  type GetPatientReferralsParams,
  ContactMadeStatuses,
  ReferralStatuses,
}
