// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateValue } from 'react-aria-components'
import { Claim, ClaimServiceLine, Metadata } from '@/types'

enum RevenueCycleTab {
  Claim = 'Claim',
  Submission = 'Submission',
  ResponseHistory = 'Response History',
  InsurancePayment = 'Ins. Payment',
  PatientStatement = 'Patient Statement',
  ClaimDetails = 'Claim#',
  CheckDetails = 'Check#',
  ViewFile = 'File',
  DenialManagement = 'Denial Management',
}

enum FileFormats {
  PDF = 'pdf',
  EXCEL = 'xlsx',
}

enum insurancePaymentRecordStatuses {
  ACTIVE = 'Active',
}

enum patientStatementSlaimStatusCodes {
  BILLED_TO_PATIENT = 'BilledToPatient',
}

enum patientStatementRecordStatuses {
  ACTIVE = 'Active',
}

enum claimNoteSignedStatuses {
  SIGNED = 'signed',
  NONE = 'none',
  PENDING = 'pending',
  SIGNED_PENDING = 'signedpending',
  COSIGNED = 'cosigned',
  ERROR = 'error',
}
enum ClaimDetailsTab {
  BillingProvider = 'Billing Provider',
  AccidentsAndLabs = 'Accidents And Labs',
  Diagnosis = 'Diagnosis',
  Charges = 'Charges',
  ClaimDates = 'Claim Dates',
  AuthorizationsAndReferrals = 'Authorizations and Referrals and CLIA',
  SubmissionInformation = 'Submission Information',
  SubmissionResponse = 'Submission Response',
  Insurances = 'Insurances',
  Notes = 'Notes',
}
interface PaymentAttachments {
  id: string
  metadata?: Metadata
  recordStatus?: string
  paymentId?: string
  attachmentType?: string
  fileUrl?: string
  fileName: string
  file?: File
  isNewUpload?: boolean
}

interface ServiceLinePaymentAdjustment {
  id?: string
  recordStatus: string
  claimServiceLinePaymentId?: string
  adjustmentAmount: number
  adjustmentReasonCode: string
  adjustmentStatus?: string
  remarkCode?: string
  adjustmentGroupCode: string
}

interface ClaimServiceLinePayment
  extends Partial<
    Omit<ClaimServiceLine, 'dateOfServiceFrom' | 'dateOfServiceTo'>
  > {
  id?: string
  claimPaymentId?: string
  rectificationId?: string
  isRectifiedRow?: boolean
  isNegativeRow?: boolean
  billedAmount: string
  allowedAmount: string
  paidAmount: string
  copayAmount: string
  coinsuranceAmount: string
  deductibleAmount: string
  otherPr: string
  writeOffAmount: string
  chargeId: string
  recordStatus: string
  claimServiceLineId: string
  dateOfServiceFrom: DateValue
  dateOfServiceTo: DateValue
  cptCode: string
  units: number
  modifierCode1: string
  modifierCode2?: string
  modifierCode3?: string
  modifierCode4?: string
  serviceLinePaymentAdjustments?: ServiceLinePaymentAdjustment[]
}

interface InsurancePayment {
  id: string
  metadata: Metadata
  recordStatus: string
  paymentMethod: string
  paymentType: string
  amount: number
  practiceId: string
  status: string
  isDuplicate: boolean
  claimCount: string
  insuranceName: string
  insurancePlanId?:string
  checkNumber: string
  checkDate: string
  receivedDate: string
  depositDate: string
  patientId: number
  payerId: string
  unPostedAmount: number
  postedAmount: number
  receiverId: string
  creditCardId: string
  creditCardTransactionId: string
  creditCardTransactionDate: Date
  postedBy: number
  postedDate: Date
  comments: string
  paymentAttachments: PaymentAttachments[]
  claimPayments: ClaimPayment[]
}

interface PatientName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}
interface ClaimPayment extends Omit<Claim, 'patientName'> {
  metadata: Metadata
  recordStatus: string
  paymentId: string
  claimId: string
  claimPaymentId: string
  paymentSource: string
  insurancePolicyId: string
  processedAsCode: string
  insuranceInternalControlNumber: string
  dateOfServiceFrom: Date
  dateOfServiceTo: Date
  status: string
  isPostedPayment: boolean
  billedAmount: string
  allowedAmount: string
  paidAmount: string
  copayAmount: string
  patientName?: Partial<PatientName>
  coinsuranceAmount: string
  deductibleAmount: string
  otherPr: string
  writeOffAmount: string
  claimServiceLinePayments: ClaimServiceLinePayment[]
}

type AmountKeys =
  | 'billedAmount'
  | 'allowedAmount'
  | 'paidAmount'
  | 'copayAmount'
  | 'coinsuranceAmount'
  | 'deductibleAmount'
  | 'otherPr'
  | 'writeOffAmount'

interface UpdateClaimPaymentPayload
  extends Partial<
    Omit<
      ClaimPayment,
      | 'dateOfServiceFrom'
      | 'dateOfServiceTo'
      | 'id'
      | 'claimServiceLinePayments'
    >
  > {
  id: string | null
  dateOfServiceFrom?: string | Date
  dateOfServiceTo?: string | Date
  authorizationNumber?: string
  claimPaymentId?: string
  cptDescription?: string
  deletedReason?: string
  nationalDrugCode?: string
  nationalDrugCodeMeasureUnit?: string
  nationalDrugCodeQuantity?: string
  serviceLineNotes?: string
  claimServiceLinePayments: (Omit<ClaimServiceLinePayment, AmountKeys> & {
    [key in AmountKeys]: number
  })[]
}
interface GetSubmissionResponse {
  submissions: Claim[]
  total: number
}
interface GetClaimsListResponse {
  claims: Claim[]
  total: number
}

interface GetInsurancePaymentListResponse {
  insurancePayments: InsurancePayment[]
  total: number
}

interface PatientStatement {
  id: string
  patientId: number
  patientFirstName: string
  patientLastName: string
  accountNumber: string
  totalAmount: number
  paidAmount: number
  patientBalanceDue: number
  insurancePaid: number
  claimNumber?: string
  claimId: string
}

interface PatientStatementPayload {
  patientId?: number[]
  patientIds?: number[]
  claimIds?: string[]
  patientFirstName?: string
  patientLastName?: string
  accountNumber?: string
  isGroupedByPatient?: boolean
}

interface PatientStatementsListResponse {
  patientStatements: PatientStatement[]
  total: number
}

interface ClaimListSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludePatientInsurancePolicy?: boolean
  isIncludeClaimValidation?: boolean
  isIncludePatientAppointments?: boolean
  isIncludePatient?: boolean
  isIncludeDiagnosis?: boolean
  isIncludeServiceLine?: boolean
  patientId?: string
  insuranceId?: string
  claimId?: string
  locationId?: string
  dateType?: string
  isIncludePatientInsurancePlan?: boolean
  receiverName?: string
  isForcePaper?: boolean
  claimStatusCodes?: string[]
  claimNumber?: string
  fromDate?: string
  toDate?: string
  claimState?: string
  primaryStatusCodes?: string[]
  isSystemRejected?: boolean
  isIncludeClaimSubmission?: boolean
  isIncludeLocation?: boolean
  isIncludeEdiSetup?: boolean
  recordStatuses?: string[]
  insurancePolicyPriority?: string
  isHold?: boolean
  isSelfPay?: boolean
  isMarkAsSubmitted?: boolean
  isClaimScrubbed?: boolean
}

interface InsurancePaymentSearchParams {
  dateType?: string
  checkNumber?: string
  insuranceName?: string
  paymentType?: string
}
interface ClaimSubmissionPayload {
  batchId: number
  batchName: string
  errorMessage: string
  hcfatype: string
  insuranceType: string
  receiverId: string
  submissionType: string
  subscriptionTypeViewOnly: string
  claimType: string
  claimIds: string[]
  insurancePolicyPriority: string
}
interface ClaimSubmissionResponse {
  cleanClaimIds: string[]
  claimsWithErrorMessages: Record<string, ErrorMessage[]>
}

interface ErrorMessage {
  id: string
  claimId: string
  errorMessage: string
}
interface ClaimResponseType {
  claimId: string
  message: string[]
}

interface PracticeList {
  id: string
  displayName: string
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
  fileType: string
  processingStatus: string
  isProcessed: string
  isManualImport: boolean
  isCheckAlreadyExists: boolean
  transcationReferenceNumber: boolean
  fileCount: number
  filePath?: string
}

interface ResponseHistoryListResponse {
  responseHistory: ResponseHistoryRecord[]
  total: number
}

interface ResponseHistoryPayload {
  receiverId?: string
  createdOn?: DateValue
}

interface DenialListPayload {
  checkNumber: string
  claimNumber: string
  dateOfServiceFrom: DateValue | string
  dateOfServiceTo: DateValue | string
  icn: string
  insuranceName: string
}

interface ResponseHistoryDetail {
  id: string
  metadata: Metadata
  recordStatus: string
  responseId: string
  filePath: string
  fileType: string
  isProcessed: boolean
  isCheckAlreadyExists: boolean
  transcationReferenceNumber: string
}

interface ResponseHistoryDetailListResponse {
  responseHistoryDetail: ResponseHistoryDetail[]
  total: number
}

interface ClaimAuditHistory {
  metadata: Metadata
  sectionName: string
  fieldName: string
  actionType: string
  oldValue: string
  newValue: string
}

interface ClaimAuditHistoryPayload {
  dateFrom?: string
  dateTo?: string
  claimId?: string
}
interface PaymentHistoryPayload {
  dateFrom?: string
  dateTo?: string
  id: string
}

interface ResolvedByName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface DenialServiceLine {
  claimServiceLinePaymentId: string
  metadata: Metadata
  insuranceName: string
  checkNumber: string
  checkDate: string
  dateOfServiceFrom: DateValue | string
  dateOfServiceTo: DateValue | string
  processedAsCode: string
  icn: string
  deniedReason: string
  isResolved: boolean
  claimNumber: string
  resolvedByUserId: number
  resolvedByName: ResolvedByName
  resolvedDate: string
}
interface DenialListResponse {
  denialList: DenialServiceLine[]
  total: number
}

interface ClaimAuditHistoryFilterFormProps {
  onFilterSubmit: (data?: ClaimAuditHistoryPayload) => void
}

interface ClaimNoteHistoryPayload {
  claimNoteId: string
  isIncludeCreateHistory: boolean
}

export {
  RevenueCycleTab,
  FileFormats,
  insurancePaymentRecordStatuses,
  patientStatementSlaimStatusCodes,
  patientStatementRecordStatuses,
  claimNoteSignedStatuses,
  ClaimDetailsTab,
  type GetSubmissionResponse,
  type DenialServiceLine,
  type DenialListResponse,
  type DenialListPayload,
  type PaymentHistoryPayload,
  type UpdateClaimPaymentPayload,
  type ClaimServiceLinePayment,
  type ServiceLinePaymentAdjustment,
  type ClaimPayment,
  type ErrorMessage,
  type ClaimResponseType,
  type ClaimSubmissionPayload,
  type ClaimSubmissionResponse,
  type ClaimListSearchParams,
  type GetClaimsListResponse,
  type InsurancePayment,
  type GetInsurancePaymentListResponse,
  type InsurancePaymentSearchParams,
  type PatientStatementsListResponse,
  type PatientStatement,
  type PaymentAttachments,
  type PracticeList,
  type PatientStatementPayload,
  type ResponseHistoryRecord,
  type ResponseHistoryListResponse,
  type ResponseHistoryPayload,
  type ResponseHistoryDetail,
  type ResponseHistoryDetailListResponse,
  type ClaimAuditHistory,
  type ClaimAuditHistoryPayload,
  type ClaimAuditHistoryFilterFormProps,
  type ClaimNoteHistoryPayload,
}
