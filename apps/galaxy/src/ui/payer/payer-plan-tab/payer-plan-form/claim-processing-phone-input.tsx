'use client'

import {
  PhoneNumberInput as PhoneNumberInputBase,
} from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ClaimProcessingPhoneNumber = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Claim Processing Phone #</FormFieldLabel>
      <PhoneNumberInputBase
        field="claimProcessingPhoneNumber"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="(xxx) xxx-xxxx"
      />
      <FormFieldError name="claimProcessingPhoneNumber" />
    </FormFieldContainer>
  )
}

export { ClaimProcessingPhoneNumber }
