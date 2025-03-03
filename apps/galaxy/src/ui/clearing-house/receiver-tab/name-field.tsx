'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const NameField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Clearinghouse Name</FormFieldLabel>
      <TextInput
        field="clearingHouseName"
        className="w-full"
        placeHolder="Search by name"
      />
    </FormFieldContainer>
  )
}

export { NameField }
