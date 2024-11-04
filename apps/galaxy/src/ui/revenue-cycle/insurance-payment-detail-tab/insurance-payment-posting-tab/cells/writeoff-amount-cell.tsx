import React from 'react'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { DollarInput } from './dollar-input'
import { amountCheck } from './utils'

const WriteoffAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.writeOffAmount`}
      onKeyDown={amountCheck}
    />
  )
}

export { WriteoffAmountCell }
