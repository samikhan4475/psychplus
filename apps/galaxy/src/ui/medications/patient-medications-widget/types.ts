import { type Row } from '@tanstack/react-table'

type PatientMedicationStatus = 'Active' | 'Pending' | 'Discontinued'

interface PrescriptionDrug {
  drugName: string
  drugDuration: string
  quantity: number
  quantityQualifier: string
  strength: string
  directions: string
}

interface PatientMedication {
  externalEncounterId: string
  fillDateTime: string
  pharmacyName: string
  staffId: number
  providerId: number
  patientId: number
  refillCount: string
  writtenDate: string
  durationQualifier: string
  appointmentId: number
  prescriptionDrugs?: PrescriptionDrug[]
  providerName: string
  prescriptionStatus: string
  endDate: string
  dosagePerDayText: string
  refillText: string
  addToNote: boolean
}

type PatientMedicationRow = Row<PatientMedication>

interface GetPatientMedicationsResponse {
  medications: PatientMedication[]
}

export type {
  PatientMedication,
  PatientMedicationRow,
  GetPatientMedicationsResponse,
  PatientMedicationStatus,
}
