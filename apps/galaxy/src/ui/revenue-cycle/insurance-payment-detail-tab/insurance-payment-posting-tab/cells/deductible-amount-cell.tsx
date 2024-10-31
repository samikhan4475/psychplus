import React from 'react'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { DollarInput } from './dollar-input'
import { amountCheck } from './utils'

const DeductibleAmountCell = ({
  row,
}: PropsWithRow<ClaimServiceLinePayment>) => {
  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.deductibleAmount`}
      onKeyDown={amountCheck}
    />
  )
}

export { DeductibleAmountCell }
