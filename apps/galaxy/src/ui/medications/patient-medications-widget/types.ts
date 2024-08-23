import { type Row } from '@tanstack/react-table'

type PatientMedicationStatus = 'active' | 'pending' | 'discontinued'

interface PatientMedication {
  type: string
  drugName: string
  strength: string
  directions: string
  quantity: number
  refills: number
  writtenDate: string
  endDate: string
  prescriber: string
  pharmacy: string
  pharmacyError?: string
  status: PatientMedicationStatus
  addToNote: boolean
}

type PatientMedicationRow = Row<PatientMedication>

interface GetPatientMedicationsResponse {
  medications: PatientMedication[]
  total: number
}

export type {
  PatientMedication,
  PatientMedicationRow,
  GetPatientMedicationsResponse,
}
