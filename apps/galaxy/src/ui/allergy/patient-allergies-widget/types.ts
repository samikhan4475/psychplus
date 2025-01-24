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
  severity?: string
  comment?: string
  status: AllergyStatus
}

interface AllergiesSearchParams {
  observationDate?: string | null
  endDate?: string | null
  name?: string
  allergyType?: string
  status?: string
  severity?: string
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

export type {
  PatientAllergy,
  PatientAllergyRow,
  GetPatientAllergiesResponse,
  AllergiesSearchParams,
  AllergyDataResponse,
  GetPatientAllergiesParams,
}
