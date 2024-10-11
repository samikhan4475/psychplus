'use client'

import { PhoneNumberInput as PhoneNumberInputBase } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneNumberInput = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Phone Number
      </FormFieldLabel>
      <PhoneNumberInputBase
        field="contactDetails.mobileNumber.number"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Phone Number"
      />
      <FormFieldError name="contactDetails.mobileNumber.number" />
    </FormFieldContainer>
  )
}

export { PhoneNumberInput }
