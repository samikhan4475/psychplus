'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const EmailField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">User Email</FormFieldLabel>
      <TextInput
        field="email"
        className="w-full"
        placeHolder="Search by email"
      />
    </FormFieldContainer>
  )
}

export { EmailField }
