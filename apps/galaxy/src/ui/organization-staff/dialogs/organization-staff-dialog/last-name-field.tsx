'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const LastNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]" required>
        Last Name
      </FormFieldLabel>
      <TextInput field="lastname" className="h-6 w-full" />
      <FormFieldError name="lastname" />
    </FormFieldContainer>
  )
}

export { LastNameField }
