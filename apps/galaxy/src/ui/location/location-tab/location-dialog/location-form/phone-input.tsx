'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput as PhoneNumberInputBase,
} from '@/components'
import { FormFieldError } from '@/components/form'

const PhoneInput = () => {
  return (
    <FormFieldContainer className="flex flex-col gap-0.5">
      <FormFieldLabel>Phone</FormFieldLabel>
      <PhoneNumberInputBase
        field="phone.number"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Phone number"
      />
      <FormFieldError name="phone" />
    </FormFieldContainer>
  )
}

export { PhoneInput }
