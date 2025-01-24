'use client'

import { PhoneNumberInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const SsnInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">SSN</FormFieldLabel>
      <PhoneNumberInput
        field="socialSecurityNumber"
        className={textFieldClassName}
        placeholder="SSN"
        format="###-##-####"
        isFormattedValue
      />
      <FormFieldError name="socialSecurityNumber" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { SsnInput }
