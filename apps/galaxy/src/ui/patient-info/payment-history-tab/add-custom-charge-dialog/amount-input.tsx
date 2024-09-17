'use client'

import { FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'

const AmountInput = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">Amount</FormFieldLabel>
      <NumberInput
        field="amount"
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="$300.00"
      />
    </FormFieldContainer>
  )
}

export { AmountInput }
