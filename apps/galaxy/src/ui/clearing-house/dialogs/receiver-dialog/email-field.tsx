'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const EmailField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Email</FormFieldLabel>
      <TextInput field="email" className="w-full" />
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}

export { EmailField }
