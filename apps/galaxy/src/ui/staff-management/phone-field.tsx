import React from 'react'
import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const PhoneField = () => {
  return (
    <FormFieldContainer className="w-full flex-row items-center gap-2">
      <FormFieldLabel>Phone</FormFieldLabel>
      <PhoneNumberInput
        className="border-pp-gray-2 border border-solid !outline-none [box-shadow:none]"
        field="phone"
        placeholder="Search"
      />
    </FormFieldContainer>
  )
}

export { PhoneField }
