'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

interface PaymentDescriptionInputProps {
  label: string
}

const PaymentDescriptionInput = ({ label }: PaymentDescriptionInputProps) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text1 !font-medium">{label}</FormFieldLabel>
      <TextInput
        field="paymentDescription"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="paymentDescription" />
    </FormFieldContainer>
  )
}

export { PaymentDescriptionInput }
