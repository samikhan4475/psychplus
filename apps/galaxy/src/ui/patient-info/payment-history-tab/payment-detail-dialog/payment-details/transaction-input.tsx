'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumberInput,
} from '@/components'

const TransactionInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text1 !font-medium">
        Transaction Number
      </FormFieldLabel>
      <NumberInput
        field="transactionNumber"
        placeholder="$0.00"
        className="border-pp-gray-2 h-6  w-[388px] border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="transactionNumber" />
    </FormFieldContainer>
  )
}

export { TransactionInput }
