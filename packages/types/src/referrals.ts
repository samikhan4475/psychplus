type ReferralService =
  | 'Psychiatry'
  | 'Therapy'
  | 'Couples/Family Therapy'
  | 'Group Therapy'
  | 'TMS'
  | 'Spravato'
  | 'ECT'
  | 'ABA'
  | 'Partial Hospital Program'
  | 'Intensive Outpatient Program'
  | 'Detox'
  | 'Emergency Room'
  | 'Inpatient Psych'
  | 'Inpatient Substance Use Residential'
  | 'Inpatient Mental Health Residential'

type ReferralServiceStatus = 'Emergency' | 'Routine'

type ReferralInitiatorType = 'Customer' | 'Patient' | 'Staff'

type ReferralContactStatus =
  | 'Pending'
  | 'Attempted'
  | 'Refused'
  | 'Auth In Progress'
  | 'Scheduled'
  | 'Canceled'
  | 'Admitted'
  | 'Error'

type ReferralArchiveStatus = 'Incomplete' | 'Completed' | 'Active'

interface PatientReferral {
  id: number
  patientId: number
  service: ReferralService
  serviceStatus: ReferralServiceStatus
  initiatedBy: ReferralInitiatorType
  referringProvider: string
  contactStatus: ReferralContactStatus
  referralDateTime: string
  visitDateTime: string
  archiveStatus: ReferralArchiveStatus
  comments: string
}

export type { PatientReferral }
