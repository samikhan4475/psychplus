import { type Row } from '@tanstack/react-table'

type AllergySeverity = 'Mild' | 'Moderate' | 'Severe'

type AllergyStatus = 'active' | 'inactive'

interface PatientAllergy {
  type: string
  name: string
  reaction: string
  severity: AllergySeverity
  status: AllergyStatus
  observationDate: string
  endDate: string
  notes?: string
  addToNote: boolean
}

type PatientAllergyRow = Row<PatientAllergy>

interface GetPatientAllergiesResponse {
  allergies: PatientAllergy[]
  total: number
}

export type {
  PatientAllergy,
  AllergySeverity,
  PatientAllergyRow,
  GetPatientAllergiesResponse,
}
