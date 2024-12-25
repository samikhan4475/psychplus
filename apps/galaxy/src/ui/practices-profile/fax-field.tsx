import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const FaxField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Fax</FormFieldLabel>
      <PhoneNumberInput
        field="fax"
      />
      <FormFieldError name="fax" />
    </FormFieldContainer>
  )
}

export { FaxField }
