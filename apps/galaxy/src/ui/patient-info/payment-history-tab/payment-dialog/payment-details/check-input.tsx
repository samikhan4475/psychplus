'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'

interface PaymentDescriptionInputProps {
  label: string
}

const CheckInput = ({ label }: PaymentDescriptionInputProps) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text1 !font-medium">{label}</FormFieldLabel>
      <NumericInput
        field="paymentDescription"
        decimalScale={0}
        allowNegative={false}
        prefix=""
        placeholder="Enter check number"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        maxLimit={Number('9'.repeat(50))}
      />
      <FormFieldError name="paymentDescription" />
    </FormFieldContainer>
  )
}

export { CheckInput }
