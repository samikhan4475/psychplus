'use client'

import { FormFieldContainer, FormFieldError, NumberInput } from '@/components'

interface CoinsuranceAmountInputProps {
  disabled?: boolean
}

const CoinsuranceAmountInput = ({
  disabled = true,
}: CoinsuranceAmountInputProps) => {
  return (
    <FormFieldContainer>
      <NumberInput
        placeholder="$0.00"
        field="coInsAmount"
        className="border-pp-gray-2 !h-6 w-[50px] border border-solid outline-none [box-shadow:none]"
        disabled={disabled}
      />
      <FormFieldError name="coInsAmount" />
    </FormFieldContainer>
  )
}

export { CoinsuranceAmountInput }
