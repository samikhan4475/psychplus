'use client'

import { PhoneNumberInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const HomePhoneInput = () => {
  return (
    <FormFieldContainer className="w-44">
      <FormFieldLabel className="!text-1">Home Phone</FormFieldLabel>
      <PhoneNumberInput
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Home Phone"
        field="contactDetails.homeNumber.number"
      />
      <FormFieldError name="contactDetails.homeNumber.number" />
    </FormFieldContainer>
  )
}

export { HomePhoneInput }
