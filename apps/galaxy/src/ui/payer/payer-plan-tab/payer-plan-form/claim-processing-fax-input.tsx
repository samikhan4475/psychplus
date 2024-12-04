'use client'

import { PhoneNumberInput as FaxNumberInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ClaimProcessingFaxNumber = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1">
        Claim Processing Fax #
      </FormFieldLabel>
      <FaxNumberInput
        field="claimProcessingFaxNumber"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="(xxx) xxx-xxxx"
      />
    </FormFieldContainer>
  )
}

export { ClaimProcessingFaxNumber }
