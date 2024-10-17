'use client'

import { type PropsWithRow } from '@/components'
import { InsurancePaymentDialog } from '../dialogs'
import { InsurancePayment } from '../types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<InsurancePayment>) => {
  return <InsurancePaymentDialog data={record} />
}

export { RowActionEdit }
