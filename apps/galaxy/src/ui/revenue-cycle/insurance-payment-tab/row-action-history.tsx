'use client'

import { type PropsWithRow } from '@/components'

import { InsurancePayment } from '../types'
import { InsurancePaymentHistoryDialog } from '../dialogs/insurance-payment-history-dialog'

const RowActionHistory= ({
  row: { original: record },
}: PropsWithRow<InsurancePayment>) => {
  return <InsurancePaymentHistoryDialog paymentId={record.id} />
}

export { RowActionHistory}
