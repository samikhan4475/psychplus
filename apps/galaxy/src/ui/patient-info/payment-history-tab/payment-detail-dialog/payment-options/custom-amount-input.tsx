'use client'

import { FormFieldContainer, FormFieldError, NumberInput } from '@/components'

interface CustomAmountProps {
  disabled?: boolean
}

const CustomAmountInput = ({ disabled }: CustomAmountProps) => {
  return (
    <FormFieldContainer className="items-end">
      <NumberInput
        placeholder="$0.00"
        field="customAmount"
        className="border-pp-gray-2 !h-6 w-[50px] border border-solid outline-none [box-shadow:none]"
        disabled={disabled}
        
      />
      <FormFieldError name="customAmount" />
    </FormFieldContainer>
  )
}

export { CustomAmountInput }
