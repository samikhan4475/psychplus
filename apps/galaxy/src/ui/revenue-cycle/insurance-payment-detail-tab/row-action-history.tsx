'use client'

import { type PropsWithRow } from '@/components'

import { ClaimPayment } from '../types'
import { ClaimPaymentHistoryDialog } from '../dialogs/claimpayment-history-dialog'

const RowActionHistory= ({
  row: { original: record },
}: PropsWithRow<ClaimPayment>) => {
  return <ClaimPaymentHistoryDialog paymentId={record.id} />
}

export { RowActionHistory}
