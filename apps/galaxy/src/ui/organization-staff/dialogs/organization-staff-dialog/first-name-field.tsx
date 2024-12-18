'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const FirstNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]" required>
        First Name
      </FormFieldLabel>
      <TextInput field="firstname" className="h-6 w-full" />
      <FormFieldError name="firstname" />
    </FormFieldContainer>
  )
}

export { FirstNameField }
