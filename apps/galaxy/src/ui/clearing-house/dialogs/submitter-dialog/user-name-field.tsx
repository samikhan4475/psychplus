'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const UserNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>User Name</FormFieldLabel>
      <TextInput field="username" className="w-full" />
      <FormFieldError name="username" />
    </FormFieldContainer>
  )
}

export { UserNameField }
