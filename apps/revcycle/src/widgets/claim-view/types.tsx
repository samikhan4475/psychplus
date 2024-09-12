interface MetaData {
  createdOn: Date
  createdBy: number
  createdByFullName: string
  updatedOn: Date
  updatedBy: number
  updatedByFullName: string
  deletedOn: Date
  deletedBy: number
  deletedByFullName: string
}

interface ClaimServiceLine {
  id?: string
  metadata?: MetaData
  recordStatus: string
  claimId: string
  cptCode: string
  cptDescription: string
  nationalDrugCode: string
  modifierCode1: string
  modifierCode2: string
  modifierCode3: string
  modifierCode4: string
  diagnosisPointer1: string
  diagnosisPointer2: string
  diagnosisPointer3: string
  diagnosisPointer4: string
  serviceLineNotes: string
  authorizationNumber: string
  deletedReason: string
  minutes: string
  startTime: string
  endTime: string
  sequenceNo: number
  dateOfServiceFrom: Date
  dateOfServiceTo: Date
  units: number
  nationalDrugCodeQuantity: number
  nationalDrugCodeMeasureUnit: string
  unitAmount: number
  totalAmount: number
  placeOfService: string
  isDoNotBill: true
  statusCode: string
}

interface ClaimDiagnosis {
  id?: string
  metadata?: MetaData
  recordStatus: string
  claimId: string
  diagnosisCode: string
  diagnosisDescription: string
  deletedReason: string
  sequenceNo: number
}

interface Claim {
  id: string
  metadata?: MetaData
  recordStatus: string
  practiceId: string
  appointmentId: number
  claimNumber: string
  locationId: string
  renderingProviderId: number
  attendingProviderId: number
  supervisingProviderId: number
  orderingProviderId: number
  referringProviderId: number
  patientId: number
  placeOfService: string
  dateOfServiceFrom: Date
  dateOfServiceTo: Date
  claimType: string
  isAnesthesiaClaim: boolean
  authorizationNumber: string
  referralNumber: string
  clinicalLaboratoryImprovementAmendmentsNumber: string
  claimNotes: string
  payerClaimControlNumber: string
  primaryStatusCode: string
  secondaryStatusCode: string
  tertiaryStatusCode: string
  patientStatusCode: string
  createFrom: string
  deletedReason: string
  totalAmount: number
  amountDue: number
  primaryPaid: number
  secondaryPaid: number
  tertiaryPaid: number
  patientPaid: number
  primaryWriteOff: number
  secondaryWriteOff: number
  tertiaryWriteOff: number
  patientWriteOff: number
  totalWriteOff: number
  claimStatusCode: string
  isMarkAsSubmitted: boolean
  isSubmitted: boolean
  submittedDate: Date
  isHoldStatement: boolean
  isResubmitted: boolean
  isForcePaper: boolean
  rejectionReason: string
  isSelfPay: boolean
  isDraft: boolean
  isHold: boolean
  externalFileId: number
  isClaimScrubbed: boolean
  isForceUnlock: boolean
  forceUnlockBy: number
  forceUnlockDate: Date
  forceUnlockReason: string
  primaryPatientInsurancePlanId: Date
  secondaryPatientInsurancePlanId: Date
  tertiaryPatientInsurancePlanId: Date
  accidentDate: Date
  accidentState: string
  accidentType: string
  isOutsideLab: boolean
  labCharges: number
  isEmployment: boolean
  isAutoAccident: boolean
  isOtherAccident: boolean
  claimFrequencyCode: string
  lastSeenDate: Date
  patientName: string
  patientAccountNumber: string
  dos: string
  primaryInsurance: string
  status: string
  totalCharge: string
  dueAmount: string
  createdOn: Date
  submittedOn: Date
  claimServiceLines: ClaimServiceLine[]
  claimDiagnosis: ClaimDiagnosis[]
  isSystemRejected: boolean
}

interface PhoneNumber {
  type: string
  number: string
}

interface Contact {
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
}

interface Location {
  id: string
  metadata: MetaData
  isTest: boolean
  name: string
  group: string
  description: string
  npi: string
  contact: Contact
  timeZoneId: string
  distanceInMiles: number
}

interface InsurancePayer {
  id: string
  name: string
}

interface InsurancePayerOption {
  value: string
  name: string
}

interface DateTypeOption {
  value: string
  name: string
}

interface LocationOption {
  value: string
  name: string
}

interface ErrorMessage {
  id: string
  claimId: string
  errorMessage: string
}
interface ClaimSubmissionResponse {
  cleanClaimIds: string[]
  claimsWithErrorMessages: {
    [claimId: string]: ErrorMessage[]
  }
}
interface Patient {
  alternateOrPreviousContactDetails: Record<string, unknown>
  birthdate: string
  chargeKey: string
  chargeUserId: string
  cmdId: string
  contactDetails: {
    email: string
    phoneNumbers: {
      type: string
      number: string
    }[]
  }
  emergencyContact: {
    name: {
      firstName: string
      lastName: string
    }
    relationship: string
    phoneNumber: string
  }
  gender: string
  hasGuardian: boolean
  hasPhoto: boolean
  id: number
  isPlusMember: boolean
  isTest: boolean
  language: string
  legalName: {
    firstName: string
    lastName: string
  }
  medicalRecordNumber: string
  metadata: {
    createdOn: string
    updatedOn: string
    updatedBy: number
  }
  socialSecurityNumber: string
  status: string
  userId: number
  verificationStatus: string
}

interface PatientOption {
  id: string
  fullName: string
}
interface Name {
  firstName: string
  lastName: string
  middleName?: string
  honors?: string
  preferredName?: string
  title?: string
}
interface PhoneNumber {
  type: string
  number: string
}
interface Address {
  type: 'Home' | 'Mailing'
  street1?: string
  street2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  geoCoordinates?: {
    longitude?: number
    latitude?: number
    altitude?: number
  }
}

interface ClaimSubmissionDetail {
  id: string
  metadata: MetaData
  recordStatus: string
  batchId: string
  claimId: string
  status: string
  coverage: string
  amount: number
}

interface ClaimSubmissionHistory {
  id: string
  metadata: MetaData
  recordStatus: string
  practiceId: string
  submitterId: string
  receiverId: string
  batchName: string
  batchType: string
  batchStatus: string
  batchStatusDetail: string
  submittedDate: Date
  processedDate: Date
  isProcessed: boolean
  isPaper: boolean
  claimCount: number
  totalAmount: number
  ak9Error: string
  ak9Status: string
  ik5Error: string
  ik5Status: string
  isaControlNumber: string
  notes: string
  transaction837Path: string
  claimSubmissionDetail: ClaimSubmissionDetail[]
}

interface ClaimSubmissionHistoryFilters {
  batchName?: string
  batchId?: string
  submittedDate?: Date
  insurancePolicyPriority?: string
  recordStatuses?: string[]
}

interface ClaimSubmissionHistoryDetail {
  id: string
  metadata: MetaData
  recordStatus: string
  batchId: string
  claimId: string
  status: string
  coverage: string
  amount: number
  patientName: string
  claimNumber: string
  dateOfServiceFrom: Date
}

interface ContactInfo {
  email: string
  phoneNumbers: PhoneNumber[]
  addresses?: Address[]
}
interface Metadata {
  createdOn: string
  updatedOn: string
  updatedBy?: number
  updatedByFullName?: string
}

interface Staff {
  id: number
  isTest: boolean
  legalName: Name
  staffRoleCode: string
  contactInfo: ContactInfo
  metadata: Metadata
  virtualRoomLink?: string
}

interface StaffDataCodeSet {
  label: string
  value: string
}

interface ICDCode {
  code: string
  displayName: string
}

interface ICDResponse {
  codeSystemName: string
  displayName: string
  version: string
  oid: string
  codes: ICDCode[]
}

interface ICD10Code {
  id: number
  code: string
  description: string
  isFavorite: boolean
  isActive: boolean
}

// Interface for the API response
interface ICD10Response {
  // Add any other fields if they exist in the response
  codes: ICDCode[]
}
interface CPTCode {
  code: string
  displayName: string
  groupingCode: string
}

interface CPTResponse {
  codeSystemName: string
  displayName: string
  version: string
  oid: string
  codes: CPTCode[]
}

interface ModifierCode {
  code: string
  displayName: string
}

interface ModifiersResponse {
  codes: ModifierCode[]
}

interface Code {
  code: string
  display: string
}

interface CodeSet {
  code: string
  display: string
  isReadOnly: boolean
  source: string
  codes: Code[]
}

interface StatesCode {
  code: string
  displayName: string
}
interface StateCodes {
  label: string
  value: string
}

interface USAStates {
  codeSystemName: string
  displayName: string
  codes: StatesCode[]
}
interface Insurance {
  paymentType: string
  checkNumber: string
  claimNumber: string
  payerName: string
  checkDate: string
  receivedDate: string
  totalClaim: string
  status: string
  postedAmount: string
  unpostedAmount: string
  insuranceName: string
  selectDate: string
  dateType: string
  dateFrom: Date
  dateTo: Date
}

interface ResponseHistoryRecord {
  id: string
  recordStatus: string
  receiverId: string
  receiverName: string
  submitterId: string
  submitterName: string
  practiceId: string
  practiceName: string
  zipFilePath: string
  processingStatus: string
  isProcessed: string
  isManualImport: boolean
  fileCount: number
}

interface ReceiverOption {
  id: string
  name: string
}
interface ResponseHistoryDetail {
  id: string
  metadata: MetaData
  recordStatus: string
  responseId: string
  filePath: string
  fileType: string
  isProcessed: boolean
  isCheckAlreadyExists: boolean
  transcationReferenceNumber: string
}

export type {
  Claim,
  InsurancePayer,
  InsurancePayerOption,
  DateTypeOption,
  LocationOption,
  Location,
  ClaimSubmissionResponse,
  ErrorMessage,
  Patient,
  PatientOption,
  ClaimSubmissionHistory,
  ClaimSubmissionHistoryDetail,
  ClaimSubmissionHistoryFilters,
  Staff,
  StaffDataCodeSet,
  ICDResponse,
  ICDCode,
  CPTCode,
  CPTResponse,
  ModifiersResponse,
  ModifierCode,
  CodeSet,
  Code,
  StatesCode,
  USAStates,
  StateCodes,
  ICD10Code,
  ICD10Response,
  Insurance,
  ResponseHistoryRecord,
  ReceiverOption,
  ResponseHistoryDetail,
}
