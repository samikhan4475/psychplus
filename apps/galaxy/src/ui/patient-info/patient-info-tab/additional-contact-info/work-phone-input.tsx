'use client'

import { PhoneNumberInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const WorkPhoneInput = () => {
  return (
    <FormFieldContainer className="w-44">
      <FormFieldLabel className="!text-1">Work Phone</FormFieldLabel>
      <PhoneNumberInput
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Work Phone"
        field="contactDetails.workNumber.number"
      />
      <FormFieldError name="contactDetails.workNumber.number" />
    </FormFieldContainer>
  )
}
export { WorkPhoneInput }
