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
  note?: string
  drugNote?: string
  pharmacyNotificationResponseId?: string
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

interface PrescriberRxRenewalResponse {
  id?: string
  notificationId?: string
  notificationType?: string
  responseDate?: string
  recordSource?: string
  responseType?: string
  userResponseType?: string
  transactionId?: string
  notificationTypeDisplayName?: string
  userTransactionStatus?: string
  note?: string
  pharmacyNotificationResponseDrug?: PharmacyNotificationDrugModel[]
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
  notificationUserResponseType?: string
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
  patientPostalPlus4Code?: string
  patientCountryCode?: string
  drugList?: PharmacyNotificationDrugModel[]
  notes?: string
  staff?: StaffResource
  pharmacyNotificationId: string
  pharmacyAddress?: PharmacyAddress
  isResponsePending?: boolean
  rxChangeRequestCode?: string
  patient?: PatientData
  pharmacyNotificationResponseList?: PrescriberRxRenewalResponse[]
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
  source?: string
}

enum RefillMedicationType {
  Prescribed = 'Prescribed',
  Requested = 'Requested',
  Dispensed = 'Dispensed',
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
  priorAuthorizationCode?: string
  priorAuthorizationStatus?: string
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

interface RxChangeResponseDrugDetail {
  drugCode?: string
  drugCodeQualifier?: string
  drugDescription?: string
  quantityValue?: string
  quantityCodeListQualifier?: string
  quantityUnitOfMeasureCode?: string
  signatureText?: string
  isSubstitutionsAllowed?: boolean
  daysSupply?: string
  refills?: string
}

interface ChangeRequestPayload {
  responseType: RenewalResponseType
  referenceNumber?: string
  note?: string
  denialReasonType?: string
  validatedResponseReasonType?: string[]
  validatedResponseDate?: string
  denialReasonDetail?: string
  rxChangeResponseDrugDetail?: RxChangeResponseDrugDetail
}

enum PharmacyNotificationType {
  PharmacyRxRenewalRequest = 'PharmacyRxRenewalRequest',
  PharmacyRxChangeRequest = 'PharmacyRxChangeRequest',
}

const REFILLDENIEDOPTIONS = [
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

const CHANGERESPONSEDENIEDOPTIONS = [
  { value: 'UnknownPatient', label: 'Patient unknown to the Provider' },
  { value: 'NeverUnderCare', label: 'Patient never under Provider care' },
  {
    value: 'NoLongerUnderCare',
    label: 'Patient no longer under Provider care',
  },
  {
    value: 'NeverPrescribed',
    label: 'Medication never prescribed for the patient',
  },
  {
    value: 'ContactProviderFirst',
    label: 'Patient should contact Provider first',
  },
  {
    value: 'ChangeNotAppropriate',
    label: 'Change not appropriate',
  },
  { value: 'NeedsAppointment', label: 'Patient needs appointment' },
  {
    value: 'PrescriberNotAssociated',
    label: 'Prescriber not associated with this practice or location',
  },
  {
    value: 'NoPriorAuthAttempted',
    label: 'No attempt will be made to obtain Prior Authorization',
  },
  {
    value: 'AlreadyResponded',
    label: 'Request already responded to by other means (e.g. phone or fax)',
  },
  { value: 'DeniedAtRequest', label: 'Medication denied at patient request' },
]
const MEDICATIONSSTATUS = [
  { value: 'All', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Denied', label: 'Denied' },
]

const PASTATUS = [
  {
    value: 'DocumentationApproved',
    label: 'The medication was approved by the payer',
  },
  {
    value: 'DocumentationDenied',
    label: 'The medication was not approved by the payer.',
  },
  {
    value: 'DocumentationDeferred',
    label: 'The medication request being reviewed by the payer.',
  },
  {
    value: 'DocumentationNotRequired',
    label: 'A prior authorization is not required for this medication.',
  },
  {
    value: 'DocumentationRequested',
    label:
      'The action of obtaining a prior authorization approval is being sought.',
  },
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
  type RenewalResponsePayload,
  type RxRenewalResponseDrugDetail,
  type ChangeRequestPayload,
  type PrescriberRxRenewalResponse,
  RenewalResponseTypeEnum,
  PharmacyNotificationType,
  REFILLDENIEDOPTIONS,
  CHANGERESPONSEDENIEDOPTIONS,
  MEDICATIONSSTATUS,
  PASTATUS,
}
