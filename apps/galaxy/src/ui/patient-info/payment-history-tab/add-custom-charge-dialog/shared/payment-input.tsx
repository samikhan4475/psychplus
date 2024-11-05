'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

interface Props {
  field: string
  label: string
}

const PaymentInput = ({ label, field }: Props) => {
  return (
    <FormFieldContainer className="w-auto">
      <FormFieldLabel className="!text1 !font-medium">{label}</FormFieldLabel>
      <NumericInput
        field={field}
        placeholder="$0.00"
        className="border-pp-gray-2 h-7 border border-solid outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PaymentInput }
