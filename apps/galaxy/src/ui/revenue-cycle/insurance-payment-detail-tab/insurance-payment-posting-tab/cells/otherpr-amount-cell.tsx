import React from 'react'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { DollarInput } from './dollar-input'
import { amountCheck } from './utils'

const OtherprAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.otherPr`}
      onKeyDown={amountCheck}
    />
  )
}

export { OtherprAmountCell }
