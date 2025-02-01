import React, { FormEvent } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PaymentListTypes } from '../../types'
import { SchemaType } from '../schema'

interface RemarkCodeProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void
  value: string
  rowIndex: number
}
const RemarkCodeField = ({ onChange, value, rowIndex }: RemarkCodeProps) => {
  const form = useFormContext<SchemaType>()
  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${rowIndex}.isRectifiedRow`,
  )

  return (
    <TextField.Root
      name="remarkCode"
      onChange={onChange}
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      value={value}
      variant="soft"
      className="min-w-8 max-w-8 h-4 border border-gray-8 bg-transparent "
      size="1"
    />
  )
}

export { RemarkCodeField }
