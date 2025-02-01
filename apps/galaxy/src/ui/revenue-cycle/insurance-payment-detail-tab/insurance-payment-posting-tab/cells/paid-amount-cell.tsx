import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { PaymentListTypes } from '../../types'
import { PROCESSED_AS_REVERSAL } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import { amountCheck, removeNegative } from './utils'

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
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (!value.startsWith('-') && processedAsCode === PROCESSED_AS_REVERSAL) {
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

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.paidAmount`}
      onKeyDown={(e) =>
        amountCheck(e, processedAsCode === PROCESSED_AS_REVERSAL)
      }
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      onInput={onInput}
    />
  )
}

export { PaidAmountCell }
