'use client'

import { FormFieldContainer, FormFieldError, NumericInput } from '@/components'

interface RemainingDueAmountInputProps {
  disabled?: boolean
}
const RemainingDueAmountInput = ({
  disabled,
}: RemainingDueAmountInputProps) => {
  return (
    <FormFieldContainer className="items-end">
      <NumericInput
        placeholder="$0.00"
        field="outstandingBalanceAmount"
        className="border-pp-gray-2 !h-6 w-24 border border-solid outline-none [box-shadow:none]"
        disabled={disabled}
        maxLimit={Infinity}
      />
      <FormFieldError name="outstandingBalanceAmount" />
    </FormFieldContainer>
  )
}

export { RemainingDueAmountInput }
