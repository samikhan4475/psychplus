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
      <PhoneNumberInput field="phoneContact" placeholder="Phone Number" />
      <FormFieldError name="phoneContact" />
    </FormFieldContainer>
  )
}

export { PhoneField }
