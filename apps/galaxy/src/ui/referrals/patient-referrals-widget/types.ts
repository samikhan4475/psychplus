import { type Row } from '@tanstack/react-table'

interface PatientReferral {
  dateTime: string
  serviceName: string
  serviceStatus: string
  initiatedBy: string
  referringProvider: string
  contactStatus: string
  visitDate?: string
  referralStatus: string
  comments: string
}

type PatientReferralRow = Row<PatientReferral>

interface GetPatientReferralsResponse {
  referrals: PatientReferral[]
  total: number
}

export type { PatientReferral, PatientReferralRow, GetPatientReferralsResponse }
