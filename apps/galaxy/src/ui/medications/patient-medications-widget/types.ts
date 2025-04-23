import { Metadata, Sort } from '@/types'
import { PatientMedicationFilterSchemaType } from './filter-form'

enum PrescribedStatus {
  Pharmacy = 'Pharmacy',
}

enum MedicationType {
  Prescribed = 'prescribed',
  Home = 'home',
}
enum RecordStatus {
  Active = 'Active',
  InActive = 'InActive',
}
enum PatientPrescriptionStatus {
  ACTIVE = '1',
  ARCHIVED = '2',
  CANCELLED = '3',
  DISCONTINUED = '4',
  AWAITING_APPROVAL = '5',
  CURRENT_MEDICATION = '6',
}

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
  id: string
  metadata?: Metadata
  prescriptionId: string
  medicationStatus: string
  recordStatus: string
  drugDescription: string
  prescribedStatus: string
  drugCode: string
  drugCodeQualifier: string
  quantityValue: number
  quantityCodeListQualifier: string
  writtenDate: string
  isSubstitutionsAllowed: boolean
  refills: number
  isMedicationAsNeeded: boolean
  startDateTime: string
  endDateTime: string
  patientId: string
  reasonForPrn: string
  externalMessageId: string
  prescriptionStatusTypeId?: number
  externalPrescriptionId: string
  messageId: string
  sentTime: string
  medicationDetails: MedicationDetails
  prescriptionStatus: PrescriptionStatus
  isControlledSubstance: boolean
}

interface GetPatientMedicationsResponse {
  medications: PatientMedication[]
}
interface GetPatientMedicationOrderResponse {
  pendingOrderId: number
  externalPatientId: number
}

interface DrugBlockProps {
  index: number
}

interface GetPatientMedicationsParams {
  formValues?: Partial<PatientMedicationFilterValues>
  page?: number
  sort?: Sort
}
interface PatientMedicationFilterValues
  extends Omit<
    PatientMedicationFilterSchemaType,
    'writtenDate' | 'endDate' | 'recordStatuses' | 'medicationStatuses'
  > {
  writtenDate?: string
  endDate?: string
  recordStatuses?: string[]
  medicationStatuses?: string[]
}
// ADD MEDICATION TYPE
interface Prescription {
  id: string
  prescriptionDate: string
  transactionId: string
  rxReferenceNumber: string
  prescribingStaffId: number
  prescriberAgentStaffId: number
  supervisorStaffId: number
  locationId: string
  practiceId: string
  patientId?: number
  appointmentId: number
  prescribedStatus: string
  pharmacyNcpdpId: string
  dataSourceType: string
  prescriptionType: string
  prescriptionStatusType: string
  noteId: number
  notes: string
  transactionStatus: string
  transactionStatusReason: string
  metadata?: Metadata
  recordStatus: string
  prescriptionDrugs: Partial<PrescriptionDrug>[]
  prescriptionSignatures: Partial<PrescriptionSignature>[]
  prescriptionDiagnoses: Partial<PrescriptionDiagnosis>[]
  testPayloadResponse: string
  validationErrors: string[]
}

interface PrescriptionDrug {
  id: string
  metadata?: Metadata
  recordStatus: string
  medicationStatus: string
  prescriptionId: string
  drugDescription: string
  drugCode: string
  drugCodeQualifier: string
  rxNormCode: string
  quantityValue: number
  quantityCodeListQualifier: string
  quantityUnitOfMeasureCode: string
  daysSupply: number
  writtenDate: string
  isSubstitutionsAllowed: boolean
  refills: number
  isMedicationAsNeeded: boolean
  reasonForPrn: string
  startDateTime: string
  endDateTime: string
  externalMessageId: string
  externalPrescriptionId: number
  prescriptionStatusTypeId: number
  medicationDetails: MedicationDetails
  isControlledSubstance: boolean
}

interface MedicationDetails {
  drugDuration: string
  pharmacyName: string
  pharmacyNcpdId: string
  providerName: string
  providerId: number
  dosagePerDayText: string
  prescriptionStatus: string
  durationQualifier: string
  strength: string
  directions: string
  quantityQualifier: string
}

interface PrescriptionSignature {
  id: string
  metadata?: Metadata
  recordStatus: string
  externalDrugId: number
  externalSigId: number
  signatureOrder: number
  description: string
  strengthValue: number
  strengthFormCode: string
  strengthUnitOfMeasureCode: string
  doseStrength: string
  doseUnitCode: string
  doseFormCode: string
  doseRouteCode: string
  doseFrequencyCode: string
  duration: number
  durationUnitCode: string
  prescriptionId: string
  prescriptionDrugId: string
}

interface PrescriptionDiagnosis {
  id: string | number
  prescriptionId: string
  diagnosisCode: string
  diagnosisDescription: string
  diagnosisQualifierCode: string
  metadata?: Metadata
}

export {
  PrescribedStatus,
  MedicationType,
  PatientPrescriptionStatus,
  RecordStatus,
  type PrescriptionDiagnosis,
  type Prescription,
  type PatientMedication,
  type GetPatientMedicationsResponse,
  type GetPatientMedicationOrderResponse,
  type GetPatientMedicationsParams,
  type PatientMedicationFilterValues,
  type DrugBlockProps,
}
