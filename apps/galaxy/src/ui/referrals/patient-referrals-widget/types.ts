import { type Row } from '@tanstack/react-table'
import { LegalName, PatientAddress, Sort, type PatientReferral } from '@/types'

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
  sort?: Sort
}
interface SubmitExternalReferral {
  practiceStateCode: string
  patientName: LegalName
  patientContactDetails: {
    email: string
    phoneNumbers?: Array<{
      type: string
      number: string
    }>
    addresses: PatientAddress[]
  }
  patientStateCode: string
  patientDob: string
  additionalNotes: string
  referralServiceType: string
}
export {
  QueryByNextDays,
  type PatientReferral,
  type PatientReferralRow,
  type GetPatientReferralsResponse,
  type GetPatientReferralsParams,
  type PatientReferralsPayload,
  type SubmitExternalReferral,
}
