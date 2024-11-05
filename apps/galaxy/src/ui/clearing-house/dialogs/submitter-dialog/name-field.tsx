'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const NameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Name</FormFieldLabel>
      <TextInput field="name" className="w-full" />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { NameField }
