'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput
} from '@/components'

const SocialSecurityNumberField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Social Security</FormFieldLabel>
      <PhoneNumberInput
        field="ssn"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="SS"
        format="###-##-####"
      />
    </FormFieldContainer>
  )
}

export { SocialSecurityNumberField }
