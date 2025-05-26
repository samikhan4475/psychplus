import { Metadata, StaffResource } from '@/types'

interface DrugSignature {
  id: string
  signatureText: string
}

interface DrugDiagnosis {
  id: string
  notificationId: string
  pharmacyNotificationDrugId: string
  diagnosisCode?: string
  diagnosisCodeQualifier?: string
  diagnosisDescription?: string
}

interface PharmacyNotificationDrugModel {
  id: string
  notificationId?: string
  metadata?: Metadata
  drugDescription?: string
  quantityValue?: string
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
  refills?: string
  isMedicationAsNeeded?: boolean
  reasonForMedicationAsNeeded?: string
  endDateTime?: string
  otherMedicationDate?: string
  otherMedicationDateQualifier?: string
  drugSignatureList?: DrugSignature[]
  drugDiagnosisList?: DrugDiagnosis[]
}
interface PharmacyAddress {
  type?: string
  street1?: string
  city?: string
  state?: string
  country?: string
}
interface PatientData {
  id: number
  metadata: Metadata
  verificationStatus: string
  userId: number
  legalName: {
    firstName: string
    lastName: string
  }
  birthdate: string
  gender: string
  medicalRecordNumber: string
  chargeUserId: string
  isPlusMember: boolean
  hasPhoto: boolean
  contactDetails: {
    email: string
    isMailingAddressSameAsPrimary: boolean
  }
  status: string
  hasGuardian: boolean
  patientVerificationTimeElapsed: number
  patientTypeEstablishedOrNew: string
  isSelfPay: boolean
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
  patientZipLast4?: string
  patientCountryCode?: string
  drugList?: PharmacyNotificationDrugModel[]
  notes?: string
  staff?: StaffResource
  pharmacyNotificationId: string
  pharmacyAddress?: PharmacyAddress
  isResponsePending?: boolean
  patient?: PatientData
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
  isResponsePending?: boolean
  notificationResponseDate?: string
  recordSource?: string
  prescriptionId?: string
  isIncludeStaff?: boolean
  isIncludeDrugList?: boolean
  isIncludePharmacyData?: boolean
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
interface MapPatientTypes {
  mrn?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  age?: string
  gender?: string
  telephone?: string
}

enum RenewalResponseTypeEnum {
  Approved = 'Approved',
  Denied = 'Denied',
}

type RenewalResponseType = 'Approved' | 'Denied'
type denialReasonType = 'UnknownPatient'
interface RxRenewalResponseDrugDetail {
  drugDescription?: string
  quantityValue?: string
  isSubstitutionsAllowed?: boolean
  drugCode?: string
  drugCodeQualifier?: string
  daysSupply?: string
}

interface RenewalResponsePayload {
  responseType: RenewalResponseType
  referenceNumber?: string
  note?: string
  denialReasonType?: denialReasonType | string
  denialReasonDetail?: string
  numberOfRefills?: number
  rxRenewalResponseDrugDetail?: RxRenewalResponseDrugDetail
}
const DENIEDOPTIONS = [
  { value: 'UnknownPatient', label: 'Patient unknown to the Provider' },
  { value: 'NeverUnderCare', label: 'Patient never under Provider care' },
  {
    value: 'NoLongerUnderCare',
    label: 'Patient no longer under Provider care',
  },
  { value: 'RefillTooSoon', label: 'Patient has requested refill too soon' },
  {
    value: 'NeverPrescribed',
    label: 'Medication never prescribed for the patient',
  },
  {
    value: 'ContactProviderFirst',
    label: 'Patient should contact Provider first',
  },
  { value: 'NotAppropriate', label: 'Fill/Refill not appropriate' },
  { value: 'NeedsAppointment', label: 'Patient needs appointment' },
  {
    value: 'PrescriberNotAssociated',
    label: 'Prescriber not associated with this practice or location',
  },
  {
    value: 'AlreadyResponded',
    label: 'Request already responded to by other means (e.g. phone or fax)',
  },
  { value: 'DeniedAtRequest', label: 'Medication denied at patient request' },
  {
    value: 'AllergyToMedication',
    label: 'Patient had allergy to requested medication',
  },
  {
    value: 'DiscontinuedMedication',
    label: 'Medication has been discontinued',
  },
]

const MEDICATIONSSTATUS = [
  { value: 'All', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Denied', label: 'Denied' },
]
export {
  RefillMedicationType,
  type MedicationRefill,
  type MedicationRefillResponseList,
  type MedicationRefillAPIRequest,
  type PatientPersonInfo,
  type MedicationHistoryPayload,
  type MedicationHistoryResponse,
  type MapPatientTypes,
  RenewalResponseTypeEnum,
  type RenewalResponsePayload,
  type RxRenewalResponseDrugDetail,
  DENIEDOPTIONS,
  MEDICATIONSSTATUS,
}
