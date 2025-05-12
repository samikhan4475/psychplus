import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const PhoneField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Phone</FormFieldLabel>
      <PhoneNumberInput
        field="contactInfo.phoneNumbers.0.number"
        placeholder="(000) 000-0000"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="contactInfo.phoneNumbers.0.number" />
    </FormFieldContainer>
  )
}

export { PhoneField }
