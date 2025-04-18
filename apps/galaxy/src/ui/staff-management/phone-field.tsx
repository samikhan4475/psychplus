import React from 'react'
import { FormFieldContainer, PhoneNumberInput } from '@/components'

const PhoneField = () => {
  return (
    <FormFieldContainer>
      <PhoneNumberInput
        label="Phone"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        field="phone"
        labelClassName="text-[11px]"
        placeholder="Search"
      />
    </FormFieldContainer>
  )
}

export { PhoneField }
