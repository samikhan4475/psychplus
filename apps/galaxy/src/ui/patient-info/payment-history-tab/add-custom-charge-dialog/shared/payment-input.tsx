'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

interface Props {
  field: string
  label: string
  disabled?: boolean
}

const PaymentInput = ({ label, field, disabled }: Props) => {
  return (
    <FormFieldContainer className="w-auto">
      <FormFieldLabel className="!text1 !font-medium">{label}</FormFieldLabel>
      <NumericInput
        field={field}
        disabled={disabled}
        placeholder="$0.00"
        className="border-pp-gray-2 h-7 border border-solid outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PaymentInput }
