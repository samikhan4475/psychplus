'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const UserNameField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">User Name</FormFieldLabel>
      <TextInput
        field="username"
        className="w-full"
        placeHolder="Search by user name"
      />
    </FormFieldContainer>
  )
}

export { UserNameField }
