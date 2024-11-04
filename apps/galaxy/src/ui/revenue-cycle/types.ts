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
  remarkCode: string
  adjustmentGroupCode: string
}

interface ClaimServiceLinePayment
  extends Partial<
    Omit<ClaimServiceLine, 'dateOfServiceFrom' | 'dateOfServiceTo'>
  > {
  id?: string
  claimPaymentId?: string
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
  insuranceName: string
  checkNumber: string
  checkDate: string
  receivedDate: string
  depositDate: string
  patientId: number
  payerId: string
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
interface ClaimPayment extends Claim {
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
  billedAmount: string
  allowedAmount: string
  paidAmount: string
  copayAmount: string
  coinsuranceAmount: string
  deductibleAmount: string
  otherPr: string
  writeOffAmount: string
  claimServiceLinePayments: ClaimServiceLinePayment[]
}

interface UpdateClaimPaymentPayload
  extends Partial<
    Omit<ClaimPayment, 'dateOfServiceFrom' | 'dateOfServiceTo' | 'id'>
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
}

interface PatientStatementPayload {
  patientId?: number[]
  patientFirstName?: string
  patientLastName?: string
  accountNumber?: string
  isGroupByPatient?: boolean
}

interface PatientStatementsListResponse {
  patientStatements: PatientStatement[]
  total: number
}

interface ClaimListSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientId?: string
  insuranceId?: string
  claimId?: string
  locationId?: string
  dateType?: string
  isIncludePatientInsurancePlan?: boolean
  receiverName?: string
  isForcePaper?: boolean
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
interface ClearingHouseReceiver {
  id: string
  clearingHouseName: string
  receiverId: string
  receiverName: string
  phone: string
  fax: string
  email: string
  website: string
  submissionMethod: string
  submissionUrl: string
  submissionPort: number
  submissionDirectory: string
  batchResponseDirectory: string
  chResponseDirectory: string
  claimResponseDirectory: string
  eraResponseDirectory: string
  isa01: string
  isa03: string
  isa05: string
  isa07: string
  isa08: string
  gs03: string
  nm140ReceiverName: string
  nm140ReceiverId: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  recordStatus: string
}

interface PracticeList {
  id: string
  displayName: string
}

export {
  RevenueCycleTab,
  type UpdateClaimPaymentPayload,
  type ClaimServiceLinePayment,
  type ServiceLinePaymentAdjustment,
  type ClaimPayment,
  type ClearingHouseReceiver,
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
}
