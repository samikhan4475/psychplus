'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumberInput,
} from '@/components'

const CheckNumberInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text1 !font-medium">
        Check Number
      </FormFieldLabel>
      <NumberInput
        field="checkNumber"
        placeholder="123456"
        className="border-pp-gray-2 h-6  w-[388px] border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="checkNumber" />
    </FormFieldContainer>
  )
}

export { CheckNumberInput }
