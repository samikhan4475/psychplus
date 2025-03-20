import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { PaymentListTypes } from '../../types'
import { PROCESSED_AS_REVERSAL } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import {
  addDefaultNegative,
  amountCheck,
  amountPaste,
  removeNegative,
} from './utils'

const OtherprAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const processedAsCode = form.watch('processedAsCode')
  const isReversal = processedAsCode === PROCESSED_AS_REVERSAL
  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${row.index}.isRectifiedRow`,
  )

  const billedAmount = form.watch(
    `claimServiceLinePayments.${row.index}.billedAmount`,
  )

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    isReversal && addDefaultNegative(event)

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedAmount = amountPaste(e, isReversal)

    if (!pastedAmount) return

    if (+removeNegative(pastedAmount) > +billedAmount) {
      toast.error(`OtherPr amount cannot be greater than billed amount`)
      return e.preventDefault()
    }

    form.setValue(`claimServiceLinePayments.${row.index}.otherPr`, pastedAmount)
  }

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.otherPr`}
      onInput={onInput}
      onPaste={onPaste}
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      onKeyDown={(e) => amountCheck(e, isReversal)}
    />
  )
}

export { OtherprAmountCell }
