'use client'

import { PhoneNumberInput as PhoneNumberInputBase } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneNumberInput = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Phone Number
      </FormFieldLabel>
      <PhoneNumberInputBase
        field="phone"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}

export { PhoneNumberInput }
