'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'

const NameField = () => {
  return (
    <FormFieldContainer
      className="flex-row items-center
     gap-1"
    >
      <FormFieldLabel>Name</FormFieldLabel>
      <TextInput
        field="drugName"
        className="border-pp-gray-2 h-6 w-[120px] border border-solid !outline-none [box-shadow:none]"
        placeHolder="Search by name"
      />
    </FormFieldContainer>
  )
}
export { NameField }
