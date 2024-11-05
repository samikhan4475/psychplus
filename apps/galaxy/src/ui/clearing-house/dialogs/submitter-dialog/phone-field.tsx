'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Phone</FormFieldLabel>
      <TextInput field="phone" className="w-full" />
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}

export { PhoneField }
