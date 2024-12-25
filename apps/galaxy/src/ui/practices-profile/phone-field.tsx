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
      <FormFieldLabel className="!text-1">Phone Number</FormFieldLabel>
      <PhoneNumberInput
        field="contactInfo.phoneNumbers.0.number"
      />
      <FormFieldError name="contactInfo.phoneNumbers.0.number" />
    </FormFieldContainer>
  )
}

export { PhoneField }
