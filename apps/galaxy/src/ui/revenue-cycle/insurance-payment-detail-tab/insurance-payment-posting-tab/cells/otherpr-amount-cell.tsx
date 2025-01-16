import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { PROCESSED_AS_REVERSAL } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import { addDefaultNegative, amountCheck } from './utils'

const OtherprAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const processedAsCode = form.watch('processedAsCode')

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    processedAsCode === PROCESSED_AS_REVERSAL && addDefaultNegative(event)

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.otherPr`}
      onInput={onInput}
      onKeyDown={(e) =>
        amountCheck(e, processedAsCode === PROCESSED_AS_REVERSAL)
      }
    />
  )
}

export { OtherprAmountCell }
