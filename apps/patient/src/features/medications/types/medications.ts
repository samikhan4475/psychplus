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
  patientId: string
  externalMessageId: string
  prescriptionStatusTypeId?: number
  externalPrescriptionId: string
  messageId: string
  sentTime: string
  medicationDetails: MedicationDetails
  prescriptionStatus: PrescriptionStatus
  isControlledSubstance: boolean
}

export type { PatientMedication }
