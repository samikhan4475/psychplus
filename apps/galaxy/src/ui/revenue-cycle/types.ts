import { Claim, Metadata } from '@/types'

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
  id: string
  metadata: Metadata
  recordStatus: string
  claimServiceLinePaymentId: string
  adjustmentAmount: 0
  adjustmentReasonCode: string
  remarkCode: string
  adjustmentGroupCode: string
}
interface ClaimServiceLinePayment {
  id: string
  metadata: Metadata
  recordStatus: string
  claimPaymentId: string
  claimServiceLineId: string
  dateOfServiceFrom: Date
  dateOfServiceTo: Date
  cptCode: string
  units: number
  billedAmount: number
  allowedAmount: number
  paidAmount: number
  copayAmount: number
  coinsuranceAmount: number
  deductibleAmount: number
  otherPR: number
  writeOffAmount: number
  modifierCode1: string
  modifierCode2: string
  modifierCode3: string
  modifierCode4: string
  serviceLinePaymentAdjustments: ServiceLinePaymentAdjustment[]
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
interface ClaimPayment {
  id: string
  metadata: Metadata
  recordStatus: string
  paymentId: string
  claimId: string
  paymentSource: string
  insurancePolicyId: string
  processedAsCode: string
  insuranceInternalControlNumber: string
  claimServiceLinePayments: ClaimServiceLinePayment[]
}
interface GetClaimsListResponse {
  claims: Claim[]
  total: number
}

interface GetInsurancePaymentListResponse {
  insurancePayments: InsurancePayment[]
  total: number
}

interface ClaimListSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientId?: number
  insuranceId?: string
  claimId?: string
  locationId?: string
  dateType?: string
  isIncludePatientInsurancePlan?: boolean
  receiverName?: string
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
  type PaymentAttachments,
  type PracticeList,
}
