import { type Row } from '@tanstack/react-table'

type PatientMedicationStatus = 'Active' | 'Pending' | 'Discontinued'

interface MedicationDetails {
  drugDuration: string
  pharmacyName: string
  providerName: string
  dosagePerDayText: string
  prescriptionStatus: string
  durationQualifier: string
  strength: string
  directions: string
  quantityQualifier: string
}

interface PatientMedication {
  prescriptionId: string
  drugDescription: string
  quantityValue: number
  quantityCodeListQualifier: string
  writtenDate: string
  isSubstitutionsAllowed: boolean
  refills: number
  isMedicationAsNeeded: boolean
  startDateTime: string
  endDateTime: string
  medicationDetails: MedicationDetails
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
