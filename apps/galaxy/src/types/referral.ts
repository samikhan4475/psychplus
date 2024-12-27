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
}
interface PatientReferral {
  id: number
  metadata?: Metadata
  patientId: number
  patientName: LegalName
  patientStatus?: string
  patientDateOfBirth?: string
  patientGender?: string
  referralDate?: string
  resourceStatus?: string
  referredByType?: string
  referredByName: LegalName
  service: string
  servicesStatus: string
  contactStatus: string
  visitDateTime?: string
  comments: string
  appointmentId?: string
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
