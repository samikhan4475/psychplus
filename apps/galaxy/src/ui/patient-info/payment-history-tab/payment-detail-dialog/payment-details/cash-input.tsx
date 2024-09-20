'use client'

import { FormFieldContainer, FormFieldError, NumberInput } from '@/components'

const CashInput = () => {
  return (
    <FormFieldContainer className="h-full items-end pt-5">
      <NumberInput
        field="cashAmount"
        placeholder="$0.00"
        className="border-pp-gray-2 h-6  w-[388px] border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="cashAmount" />
    </FormFieldContainer>
  )
}

export { CashInput }
