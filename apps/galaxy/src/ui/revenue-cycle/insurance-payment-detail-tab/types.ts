import { Metadata } from '@/types'

enum PaymentListTypes {
  All = 'All',
  Posted = 'Posted',
  Unposted = 'NeedPosted',
  Unlinked = 'Unlinked',
}

interface PaymentAdjustment {
  metadata: Metadata
  adjustmentGroupCode: string
  adjustmentReasonCode: string
  adjustmentAmount: number
  claimServiceLinePaymentId: string
  id: string
  recordStatus: string
  practiceId: string
  description: string
  rejectionCode: string
  groupCode: string
  reasonCode: string
  remarkCode: string
  adjustmentStatus: string
}

interface PostApiResponse {
  success: boolean
  errors: string[]
}

interface ClaimPaymentWithError {
  id: string
  claimPaymentId: string
  errorMessage: string[]
}

interface PostPaymentCheckResponse {
  claimPaymentsWithErrors: ClaimPaymentWithError[]
  success: boolean
}

export {
  PaymentListTypes,
  type PaymentAdjustment,
  type PostApiResponse,
  type PostPaymentCheckResponse,
}
