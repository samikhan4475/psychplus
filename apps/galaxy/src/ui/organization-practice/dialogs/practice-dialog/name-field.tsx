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
      <FormFieldLabel className="pb-[3px]">Name</FormFieldLabel>
      <TextInput field="name" className="h-6 w-full" />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { NameField }
