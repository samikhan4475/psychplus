'use client'

import { PhoneNumberInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Phone</FormFieldLabel>
      <PhoneNumberInput field="phone" className="w-full" />
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}

export { PhoneField }
