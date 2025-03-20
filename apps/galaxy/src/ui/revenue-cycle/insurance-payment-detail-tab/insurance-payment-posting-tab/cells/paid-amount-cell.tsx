import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { formatValueWithDecimals } from '@/utils'
import { PaymentListTypes } from '../../types'
import { PROCESSED_AS_REVERSAL } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import { amountCheck, amountPaste, removeNegative } from './utils'

const PaidAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const allowedAmount = form.watch(
    `claimServiceLinePayments.${row.index}.allowedAmount`,
  )

  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${row.index}.isRectifiedRow`,
  )
  const processedAsCode = form.watch('processedAsCode')
  const isReversal = processedAsCode === PROCESSED_AS_REVERSAL
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (!value.startsWith('-') && isReversal) {
      event.target.value = '-' + value
    }

    if (allowedAmount === '0' || allowedAmount === '') {
      toast.error(`Please enter allowed amount first`)
      event.target.value = value.slice(0, value.length - 1)
    } else if (
      parseFloat(removeNegative(value)) >
      parseFloat(removeNegative(allowedAmount))
    ) {
      toast.error(`Paid Amount cannot be greater than allowed amount`)
      // Dont allow user to type if its not valid
      event.target.value = value.slice(0, value.length - 1)
    }
  }
  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedAmount = amountPaste(e, isReversal)
    if (!pastedAmount) return
    if (+removeNegative(pastedAmount) > +removeNegative(allowedAmount)) {
      toast.error(`Paid amount cannot be greater than allowed amount`)
      return e.preventDefault()
    }

    form.setValue(
      `claimServiceLinePayments.${row.index}.paidAmount`,
      pastedAmount,
    )
  }
  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.paidAmount`}
      onKeyDown={(e) => amountCheck(e, isReversal)}
      onPaste={onPaste}
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      onInput={onInput}
    />
  )
}

export { PaidAmountCell }
