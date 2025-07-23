import { LegalName, Metadata, PatientAddress, Sort } from '@/types'
import { PatientMedicationFilterSchemaType } from './filter-form'

enum PrescribedStatus {
  Pharmacy = 'Pharmacy',
}

enum MedicationType {
  Prescribed = 'prescribed',
  Home = 'home',
}
interface DrugDetail {
  drugName?: string
  doseStrength: string
  doseUnit: string
  drugForm: string
  durationDays: string
  durationUnit: string
  route: string
  frequency: string
  prn: string
  quantity: string
  sig: string
  refills: string
  medicationStatus: string
  startDateTime: string
  endDateTime: string
  substitution: string
  prescriber: string
  npi: string
  dea: string
  instructionsNotes: string
  diagnosis: string
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
  transactionStatus: string
  userTransactionStatus:string
  effectiveDate:string
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
  pharmacyRecordStatus: string
  pharmacyId: string
  prescriptionPharmacyName: string
  pharmacySource: string
  pharmacyStoreNumber: string
  pharmacyActiveStartTime: string
  pharmacyActiveEndTime: string
  pharmacyServiceLevel: string
  providerName: LegalName
  providerNpi: string
  providerDea: string
  pharmacyAddress: Partial<PatientAddress>
  pharmacyPhone: string
  patientHeight: number
  patientWeight: number
  prescriptionDrugs: Partial<PrescriptionDrug>[]
  prescriptionSignatures: Partial<PrescriptionSignature>[]
  prescriptionDiagnoses: Partial<PrescriptionDiagnosis>[]
  testPayloadResponse: string
  validationErrors: string[]
  pharmacyFax: string
  writtenDate: string
  drugList?: Partial<PrescriptionDrug>[]
  rxChangeRequestCode?: string
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
  effectiveDate: string
  externalMessageId: string
  externalPrescriptionId: number
  prescriptionStatusTypeId: number
  medicationDetails: MedicationDetails
  isControlledSubstance: boolean
  DrugNote: string
  drugNote: string
  DeaSchedule: string
  deaSchedule: string
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
  DrugNote: string
}

interface PrescriptionDiagnosis {
  id: string | number
  prescriptionId: string
  diagnosisCode: string
  diagnosisDescription: string
  diagnosisQualifierCode: string
  metadata?: Metadata
}

interface PrescriptionSignResponse {
  signatureType: string | number
  pending: boolean
}

interface SelfPollStatusPayloadProps {
  prescriptionDrugIds: string[]
  otpCode?: string
  isSourcePharmacyNotification: boolean
}

interface FavoriteMedication {
  id?: string
  staffId?: string
  medicationName?: string
  partialMedicationName?: string
}
interface TransmitResult {
  id: string
  writtenDate: string
}

interface Name {
  firstName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface PmpScore {
  id: string
  metadata: Metadata
  status: string
  pmpPrescriptionId: string
  scoreType: string
  scoreValue: number
}
interface PmpScoreResponse {
  id: string
  metadata: Metadata
  status: string
  appointmentId: number
  patientId: number
  staffId: number
  staffName: Name
  locationId: string
  reportRequestUrl: string
  pmpScores: PmpScore[]
  responseMessage?: string
}

interface PmpScoreRequest {
  appointmentId?: Number
  staffId?: number
  patientId: number
  locationId?: string
  fromDateTime?: string
  toDateTime?: string
  isIncludePatient?: boolean
  isIncludeStaff?: boolean
  isIncludeAppointment?: boolean
  isIncludeLocation?: boolean
  isIncludePmpScores?: boolean
  recordStatuses?: string[]
}

interface StartPmpRequest {
  appointmentId?: Number
  patientId: number
  locationId?: string
  senderUserId?: number
  pmpPrescriptionId?: string
  reportId?: string
}
interface NarxScore {
  scoreType: string
  scoreValue: number
}

interface ReportRequestUrl {
  viewableReport: string
}

interface NarxScores {
  scores: NarxScore[]
}

interface Report {
  narxScores: NarxScores
  reportExpiration: string
  reportRequestUrl: ReportRequestUrl
  message?: string
}
interface StartPmpResponse {
  requestId: string
  report: Report
  reportId: string
}

interface PmpReportRequest {
  appointmentId: number
  staffId?: number
  patientId: string
  locationId?: string
  senderUserId?: number
  pmpPrescriptionId: string
  reportId: string
}
interface PmpReportResponse {
  reportRequestId: number
  reportLink: string
}
interface EncounterData {
  locationId?: string
  providerStaffId?: number
}
interface EditOptions {
  rePrescribe?: boolean
}

interface FavoriteMedicationPayload {
  drugStrength?: string;
  doseStrength?: string;
  doseUnitCode?: string;
  doseFormCode?: string;
  drugCode?: string;
  drugCodeQualifier?: string;
  doseRouteCode?: string;
  rxNormCode?: string | number;
  medicationName?:string;
  prescribableDrugDesc?:string;
  id?:string
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
  type DrugDetail,
  type PrescriptionSignResponse,
  type SelfPollStatusPayloadProps,
  type FavoriteMedication,
  type TransmitResult,
  type PmpScoreRequest,
  type PmpScoreResponse,
  type StartPmpResponse,
  type StartPmpRequest,
  type PmpScore,
  type PmpReportRequest,
  type PmpReportResponse,
  type EncounterData,
  type EditOptions,
  type FavoriteMedicationPayload,
  type PrescriptionDrug
}
