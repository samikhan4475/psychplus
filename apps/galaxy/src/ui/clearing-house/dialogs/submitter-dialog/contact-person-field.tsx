'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ContactPersonField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Contact Person</FormFieldLabel>
      <TextInput field="contactPerson" className="w-full" />
      <FormFieldError name="contactPerson" />
    </FormFieldContainer>
  )
}

export { ContactPersonField }
