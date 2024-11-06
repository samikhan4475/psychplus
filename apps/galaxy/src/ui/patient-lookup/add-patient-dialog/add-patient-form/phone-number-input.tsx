'use client'

import { PhoneNumberInput as PhoneNumberInputBase } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneNumberInput = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Phone No</FormFieldLabel>
      <PhoneNumberInputBase
        field="contactInfo.phoneNumbers.0.number"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="(000) 111-1111"
      />
      <FormFieldError name="contactInfo.phoneNumbers.0.number" />
    </FormFieldContainer>
  )
}

export { PhoneNumberInput }
