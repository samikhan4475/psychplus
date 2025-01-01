import { type Row } from '@tanstack/react-table'
import { type PatientReferral } from '@/types'

enum QueryByNextDays {
  NoVisits = 'NoVisits',
  Disregard = 'Disregard',
}

type PatientReferralRow = Row<PatientReferral>

interface GetPatientReferralsResponse {
  referrals: PatientReferral[]
  total?: number
}

interface PatientReferralsPayload {
  servicesOfferedList: string[]
  contactStatusList: string[]
  resourceStatusList: string[]
  fromReferralDate: string
  toReferralDate: string
}
interface GetPatientReferralsParams {
  patientIds: string[]
  payload: Partial<PatientReferralsPayload> | object
  page?: number
  IsIncludeInsurance?: boolean
}
export {
  QueryByNextDays,
  type PatientReferral,
  type PatientReferralRow,
  type GetPatientReferralsResponse,
  type GetPatientReferralsParams,
  type PatientReferralsPayload,
}
