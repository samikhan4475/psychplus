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
      <FormFieldLabel required>Phone Number</FormFieldLabel>
      <PhoneNumberInput
        field="contactInfo.phoneNumbers[0].number"
        placeholder="Phone Number"
      />
      <FormFieldError name="contactInfo.phoneNumbers[0].number" />
    </FormFieldContainer>
  )
}

export { PhoneField }
