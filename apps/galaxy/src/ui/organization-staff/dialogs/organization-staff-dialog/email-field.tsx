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
      <FormFieldLabel className="pb-[3px]" required>
        Email
      </FormFieldLabel>
      <TextInput field="email" className="h-6 w-full" />
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}

export { EmailField }
