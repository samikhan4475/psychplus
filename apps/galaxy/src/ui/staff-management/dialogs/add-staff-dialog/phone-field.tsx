import React from 'react'
import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const PhoneField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Phone</FormFieldLabel>
      <PhoneNumberInput field="contactInfo.phone" placeholder="Phone Number" />
    </FormFieldContainer>
  )
}

export { PhoneField }
