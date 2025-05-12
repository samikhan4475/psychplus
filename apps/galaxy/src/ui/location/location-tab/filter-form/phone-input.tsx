'use client'

import { PhoneNumberInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneInput = () => {
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>Phone</FormFieldLabel>
      <PhoneNumberInput field="Phone" placeholder="Enter Phone" />
      <FormFieldError name="Phone" />
    </FormFieldContainer>
  )
}

export { PhoneInput }
