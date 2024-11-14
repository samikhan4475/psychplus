'use client'

import {
  PhoneNumberInput as PhoneNumberInputBase,
  TextInput,
} from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const CredentialingContractingPhoneNumber = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Credentialing/Contracting Phone #</FormFieldLabel>
      <PhoneNumberInputBase
        field="credentialOrContractingPhoneNumber"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="(xxx) xxx-xxxx"
      />
      <FormFieldError name="credentialOrContractingPhoneNumber" />
    </FormFieldContainer>
  )
}

export { CredentialingContractingPhoneNumber }
