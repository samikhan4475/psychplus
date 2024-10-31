import React from 'react'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { amountCheck } from './utils'
import { DollarInput } from './dollar-input'

const PaidAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.paidAmount`}
      onKeyDown={amountCheck}
    />
  )
}

export { PaidAmountCell }
