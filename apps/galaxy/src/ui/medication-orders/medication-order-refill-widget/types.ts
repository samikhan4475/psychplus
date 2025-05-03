import { Metadata, StaffResource } from '@/types'

interface DrugSignature {
  id: string
  signatureText: string
}

interface DrugDiagnosis {
  id: string
  diagnosisCode: string
}

interface PharmacyNotificationDrugModel {
  id: string
  notificationId?: string
  metadata?: Metadata
  drugDescription?: string
  quantityValue?: number
  quantityCodeListQualifier?: string
  quantityUnitOfMeasureCode?: string
  medicationType?: string
  isSubstitutionsAllowed?: boolean
  startDateTime?: string
  drugCode?: string
  drugCodeQualifier?: string
  rxNormCode?: string
  daysSupply?: number
  writtenDate?: string
  lastFillDate?: string
  refills?: number
  isMedicationAsNeeded?: boolean
  reasonForMedicationAsNeeded?: string
  endDateTime?: string
  otherMedicationDate?: string
  otherMedicationDateQualifier?: string
  drugSignatureList?: DrugSignature[]
  drugDiagnosisList?: DrugDiagnosis[]
}
interface MedicationRefill {
  id: string
  notificationId: string
  notificationDateTime: string
  notificationType: string
  recordSource: string
  staffId: string
  pharmacyNcpdpId: string
  metadata?: Metadata
  pharmacyName?: string
  notificationResponseType?: string
  notificationResponseDate?: string
  prescriptionId?: string
  prescriberAgentStaffId?: number
  supervisorStaffId?: number
  transactionId?: string
  notificationReferenceId: string
  rxReferenceNumber?: string
  patientId?: string
  patientLastName?: string
  patientFirstName?: string
  patientMiddleName?: string
  patientGender: string
  patientDateOfBirth?: string
  patientAddressLine1?: string
  patientAddressLine2?: string
  patientCity?: string
  patientStateCode?: string
  patientPostalCode?: string
  patientCountryCode?: string
  drugList?: PharmacyNotificationDrugModel[] | null
  notes?: string
  staff?: StaffResource
  pharmacyNotificationId: string
}

interface MedicationRefillResponseList {
  refillRequests: MedicationRefill[]
  total: number
}

interface MedicationRefillAPIRequest {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  pharmacyNotificationId?: string
  recordStatuses?: string[]
  notificationDate?: string
  transactionId?: string
  notificationReferenceId?: string
  notificationType?: string
  rxReferenceNumber?: string
  notificationResponseType?: string
  notificationResponseDate?: string
  recordSource?: string
  prescriptionId?: string
  isIncludeStaff?: boolean
  isIncludeDrugList?: boolean
  isIncludeSignatureList?: boolean
  isIncludeDiagnosisList?: boolean
  staffId?: number
  prescriberAgentStaffId?: number
  supervisorStaffId?: number
  pharmacyNcpdpId?: string
  patientId?: number
  patientLastNameContains?: string
  patientFirstNameContains?: string
  patientMiddleNameContains?: string
  patientGender?: string
  patientDateOfBirth?: string
  patientAddressLine1Contains?: string
  patientAddressLine2Contains?: string
  patientCityContains?: string
  patientStateCode?: string
  drugDescriptionStartsWith?: string
  writtenDateRangeFrom?: string
  writtenDateRangeTo?: string
  refills?: number
  lastFillDate?: string
  drugSignatureTextContains?: string
  diagnosisCode?: string
  pharmacyNotesContains?: string
  diagnosisDescriptionStartsWith?: string
}
interface PatientPersonInfo {
  patientGender?: string
  patientDateOfBirth?: string
  patientAddressLine1?: string
  patientStateCode?: string
  patientCity?: string
  patientCountryCode?: string
  phone?: string
  email?: string
  patientId?: string
  patientFirstName?: string
  patientLastName?: string
}

enum RefillMedicationType {
  MedicationType = 'Dispensed',
}

interface MedicationHistoryPayload {
  id: string
  dateFrom?: string
  dateTo?: string
  isIncludeCreateHistory?: boolean
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
}
interface MedicationHistoryResponse {
  metadata: Metadata
  sectionName: string
  fieldName: string
  actionType: string
  oldValue: string
  newValue: string
  keyValue: string
  id: string
}
export {
  RefillMedicationType,
  type MedicationRefill,
  type MedicationRefillResponseList,
  type MedicationRefillAPIRequest,
  type PatientPersonInfo,
  type MedicationHistoryPayload,
  type MedicationHistoryResponse,
}
