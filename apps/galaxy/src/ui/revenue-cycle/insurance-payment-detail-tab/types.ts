enum PaymentListTypes {
  All = 'All',
  Posted = 'Posted',
  Unposted = 'NeedPosted',
  Unlinked = 'Unlinked',
}

interface PaymentAdjustment {
  adjustmentGroupCode: string
  adjustmentReasonCode: string
  adjustmentAmount: number
  claimServiceLinePaymentId: string
  remarkCode: string
  recordStatus: string
}

export { PaymentListTypes, type PaymentAdjustment }
