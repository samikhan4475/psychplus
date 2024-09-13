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
        className={textFieldClassName}
        placeholder="Phone Number"
      />
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { PhoneNumberInput }
