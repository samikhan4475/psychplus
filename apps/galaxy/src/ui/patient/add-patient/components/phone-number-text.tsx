'use client'

import { PhoneNumberInput as PhoneNumberInputBase } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneNumberInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Phone Number</FormFieldLabel>
      <PhoneNumberInputBase
        field="phoneNumber"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="(xxx) xxx-xxxx"
      />
      <FormFieldError name="phoneNumber" />
    </FormFieldContainer>
  )
}

export { PhoneNumberInput }
