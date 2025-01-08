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
      <FormFieldLabel>Phone Number</FormFieldLabel>
      <PhoneNumberInput
        field="contactPhone"
        placeholder="Phone Number"
      />
      <FormFieldError name="contactPhone" />
    </FormFieldContainer>
  )
}

export { PhoneField }
