import { type Row } from '@tanstack/react-table'
import { Sort } from '@/types'

type AllergyStatus = 'active' | 'inactive'

interface PatientAllergy {
  allergyType: string
  allergyName: string
  reactionId: string
  severity: string
  archive: AllergyStatus
  onsetBegan: string
  onsetEnded: string
  comment?: string
  severityCode: string
}

interface AllergyDataResponse {
  scriptSureAllergyId: number
  patientId: number
  scriptSurePatientId: number
  allergyName: string
  encounterId: number
  rxNormCode: string
  nationalDrugCode: string
  allergyType: string
  reaction: string
  severityCode: string
  adverseEventCode: string
  onsetBegan: string
  onsetEnded: string
  archive: number | string
  status: AllergyStatus
  recordStatus: string
  id: string
  reactionId: string
  appointmentId?: number
  comment?: string
  staffId?: number
  providerId?: number
}

interface AllergiesSearchParams {
  onsetStartDate?: string | null
  onsetEndDate?: string | null
  allergyName?: string
  allergyTypeCode?: string
  recordStatuses?: string[]
  severityCode?: string
  patientIds?: string[]
}

type PatientAllergyRow = Row<AllergyDataResponse>

interface GetPatientAllergiesResponse {
  data?: AllergyDataResponse[]
}

interface GetPatientAllergiesParams {
  payload?: AllergiesSearchParams
  sort?: Sort
}

interface PropsWithIndex {
  index: number
}

interface AllergyPayload {
  id: string
  patientId: number
  allergyName: string
  encounterId?: number
  rxNormCode: string
  allergyType: string
  severityCode: string
  onsetBegan: string
  onsetEnded: string
  reactionId: string
  staffId: number
  providerId: number
  recordStatus: string
  appointmentId?: number
  comment?: string

  nationalDrugCode?: string
  adverseEventCode?: string
  scriptSureAllergyId?: number
  scriptSurePatientId?: number
  dataSource?: string
  incomingState?: string
}

type CreateAllergyPayload = Omit<AllergyPayload, 'id'>

interface SearchAllergiesResponse {
  picklistId: number
  picklistDesc: string
  picklistConceptType: string
}

export type {
  PatientAllergy,
  PatientAllergyRow,
  GetPatientAllergiesResponse,
  AllergiesSearchParams,
  AllergyDataResponse,
  GetPatientAllergiesParams,
  PropsWithIndex,
  SearchAllergiesResponse,
  AllergyPayload,
  CreateAllergyPayload,
}
