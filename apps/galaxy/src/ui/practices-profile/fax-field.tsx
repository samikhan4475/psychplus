import React from 'react'
import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const FaxField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Fax</FormFieldLabel>
      <PhoneNumberInput field="practiceFax" />
    </FormFieldContainer>
  )
}

export { FaxField }
