'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ContactNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">Name</FormFieldLabel>
      <TextInput field="contactName" className="h-6 w-full" />
      <FormFieldError name="contactName" />
    </FormFieldContainer>
  )
}

export { ContactNameField }
