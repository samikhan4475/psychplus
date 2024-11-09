'use client'

import { FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'

const TotalAmountInput = () => {
  return (
    <FormFieldContainer className="w-auto">
      <FormFieldLabel className="!text1 !font-medium">
        Total Amount
      </FormFieldLabel>
      <NumberInput
        field="totalAmount"
        placeholder="$0.00"
        className="border-pp-gray-2 h-7 w-[148.5px] border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}
export { TotalAmountInput }
