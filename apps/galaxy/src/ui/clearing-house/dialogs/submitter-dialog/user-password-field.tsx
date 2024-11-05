'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const UserPasswordField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>User Password</FormFieldLabel>
      <TextInput field="password" className="w-full" />
      <FormFieldError name="password" />
    </FormFieldContainer>
  )
}

export { UserPasswordField }
