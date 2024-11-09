'use client'

import { FormFieldContainer, FormFieldError, NumericInput } from '@/components'

interface CustomAmountProps {
  disabled?: boolean
}

const CustomAmountInput = ({ disabled }: CustomAmountProps) => {
  return (
    <FormFieldContainer className="items-end">
      <NumericInput
        placeholder="$0.00"
        field="customAmount"
        className="border-pp-gray-2 !h-6 w-24 border border-solid outline-none [box-shadow:none]"
        disabled={disabled}
      />
      <FormFieldError name="customAmount" />
    </FormFieldContainer>
  )
}

export { CustomAmountInput }
