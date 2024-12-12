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
interface PatientReferral {
  id: number
  metadata?: Metadata
  patientId: number
  patientName: LegalName
  referralDate?: string
  resourceStatus?: string
  referredByType?: string
  referredByName: LegalName
  service: string
  servicesStatus: string
  contactStatus: string
  visitDateTime?: string
  comments: string
  visitId?: string
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
}
