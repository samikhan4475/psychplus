import React, { FormEvent } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PaymentListTypes } from '../../types'
import { SchemaType } from '../schema'
import { amountCheck } from './utils'

interface AdjustmentAmountProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void
  value: string
  onBlur: () => void
  rowIndex: number
}
const AdjustmentAmountField = ({
  onChange,
  value,
  onBlur,
  rowIndex,
}: AdjustmentAmountProps) => {
  const form = useFormContext<SchemaType>()

  const billedAmount = form.watch(
    `claimServiceLinePayments.${rowIndex}.billedAmount`,
  )

  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${rowIndex}.isRectifiedRow`,
  )

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (parseFloat(value) > parseFloat(billedAmount)) {
      toast.error(
        `Adjustment Amount cannot be greater than billed amount: $${billedAmount}`,
      )
      // Dont allow user to type if its not valid
      event.target.value = value.slice(0, value.length - 1)
    }
  }
  return (
    <TextField.Root
      onKeyDown={amountCheck}
      name="adjustmentAmount"
      onChange={onChange}
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      onBlur={onBlur}
      onInput={onInput}
      value={value}
      variant="soft"
      className="min-w-8 max-w-8 h-4 border border-gray-8 bg-transparent "
      size="1"
    />
  )
}

export { AdjustmentAmountField }
