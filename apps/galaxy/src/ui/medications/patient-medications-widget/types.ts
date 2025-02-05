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
interface PrescriptionStatus {
  prescriptionStatusId?: string
  prescriptionStatusTypeId: string
  prescriptionId: string
  name?: string
  encounterId?: string
  userId?: string
  userName?: string
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
  patientId:string
  externalMessageId:string
  prescriptionStatusTypeId?:string
  externalPrescriptionId: string
  messageId:string
  sentTime:string
  medicationDetails: MedicationDetails
  prescriptionStatus: PrescriptionStatus
}

type PatientMedicationRow = Row<PatientMedication>

interface GetPatientMedicationsResponse {
  medications: PatientMedication[]
}
interface GetPatientMedicationOrderResponse {
  pendingOrderId: number,
  externalPatientId: number
}

export enum PatientPrescriptionStatus {
  ACTIVE = '1',
  ARCHIVED = '2',
  CANCELLED = '3',
  DISCONTINUED = '4',
  AWAITING_APPROVAL = '5',
  CURRENT_MEDICATION = '6',
}

export type {
  PatientMedication,
  PatientMedicationRow,
  GetPatientMedicationsResponse,
  PatientMedicationStatus,
  GetPatientMedicationOrderResponse
}
