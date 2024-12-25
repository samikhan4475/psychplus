import React, { FormEvent } from 'react'
import { TextField } from '@radix-ui/themes'
import { amountCheck } from './utils'

interface AdjustmentAmountProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void
  value: string
}
const AdjustmentAmountField = ({ onChange, value }: AdjustmentAmountProps) => {
  return (
    <TextField.Root
      onKeyDown={amountCheck}
      name="adjustmentAmount"
      onChange={onChange}
      value={value}
      variant="soft"
      className="min-w-8 max-w-8 h-4 border border-gray-8 bg-transparent "
      size="1"
    />
  )
}

export { AdjustmentAmountField }
