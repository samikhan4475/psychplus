'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const UserEmailField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>User Email</FormFieldLabel>
      <TextInput field="email" className="w-full" />
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}

export { UserEmailField }
