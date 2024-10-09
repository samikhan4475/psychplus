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
  checkDate: Date
  receivedDate: Date
  depositDate: Date
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

export {
  RevenueCycleTab,
  type ClaimListSearchParams,
  type GetClaimsListResponse,
  type InsurancePayment,
  type GetInsurancePaymentListResponse,
  type InsurancePaymentSearchParams,
}
