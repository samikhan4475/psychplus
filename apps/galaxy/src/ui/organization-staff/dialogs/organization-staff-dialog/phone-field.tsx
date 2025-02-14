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
      <FormFieldLabel className="pb-[3px]" required>
        Phone
      </FormFieldLabel>
      <PhoneNumberInput field="phone" className="h-6 w-full" />
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}

export { PhoneField }
