import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '@/ui/revenue-cycle/types'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import { amountCheck } from './utils'

const PaidAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()

  const allowedAmount = form.watch(
    `claimServiceLinePayments.${row.index}.allowedAmount`,
  )

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (allowedAmount === '0' || allowedAmount === '') {
      toast.error(`Please enter allowed amount first`)
      event.target.value = value.slice(0, value.length - 1)
    } else if (parseFloat(value) > parseFloat(allowedAmount)) {
      toast.error(`Paid Amount cannot be greater than allowed amount`)
      // Dont allow user to type if its not valid
      event.target.value = value.slice(0, value.length - 1)
    }
  }

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.paidAmount`}
      onKeyDown={amountCheck}
      onInput={onInput}
    />
  )
}

export { PaidAmountCell }
