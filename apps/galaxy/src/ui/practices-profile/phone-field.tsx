import React from 'react'
import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const PhoneField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Phone Number</FormFieldLabel>
      <PhoneNumberInput field="practicePhone" />
    </FormFieldContainer>
  )
}

export { PhoneField }
