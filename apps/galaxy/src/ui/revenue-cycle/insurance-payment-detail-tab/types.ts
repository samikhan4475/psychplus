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

export { PaymentListTypes, type PaymentAdjustment }
