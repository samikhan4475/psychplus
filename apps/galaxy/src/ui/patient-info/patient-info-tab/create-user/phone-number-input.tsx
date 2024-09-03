'use client'

import { PhoneNumberInput as PhoneNumberInputBase } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneNumberInput = () => {
  return (
    <FormFieldContainer className="w-[110px]">
      <FormFieldLabel required>Phone Number</FormFieldLabel>
      <PhoneNumberInputBase field="phone" />
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}

export { PhoneNumberInput }
