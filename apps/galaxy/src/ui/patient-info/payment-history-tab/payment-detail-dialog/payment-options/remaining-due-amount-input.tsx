'use client'

import { FormFieldContainer, FormFieldError, NumberInput } from '@/components'

interface RemainingDueAmountInputProps {
  disabled?: boolean
}
const RemainingDueAmountInput = ({
  disabled,
}: RemainingDueAmountInputProps) => {
  return (
    <FormFieldContainer className="items-end">
      <NumberInput
        placeholder="$0.00"
        field="outstandingBalanceAmount"
        className="border-pp-gray-2 !h-6 w-[50px] border border-solid outline-none [box-shadow:none]"
        disabled={disabled}
      />
      <FormFieldError name="outstandingBalanceAmount" />
    </FormFieldContainer>
  )
}

export { RemainingDueAmountInput }
