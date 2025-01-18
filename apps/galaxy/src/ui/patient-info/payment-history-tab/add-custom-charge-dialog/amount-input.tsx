'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'

const AmountInput = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">Amount</FormFieldLabel>
      <NumericInput
        placeholder="$0.00"
        field="balanceDue"
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { AmountInput }
