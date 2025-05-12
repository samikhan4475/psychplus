'use client'

import { PhoneNumberInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PhoneField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="ml-2 !text-1">Phone Number</FormFieldLabel>
      <PhoneNumberInput
        field="phoneNumber"
        className="border-pp-gray-2 h-6 w-[130px] border border-solid !outline-none [box-shadow:none]"
        placeholder="Search"
      />
    </FormFieldContainer>
  )
}

export { PhoneField }
