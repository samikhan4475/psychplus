'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ClaimProcessingFaxNumber = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1">
        Claim Processing Fax #
      </FormFieldLabel>
      <TextInput field="claimProcessingFaxNumber" className="w-full" />
    </FormFieldContainer>
  )
}

export { ClaimProcessingFaxNumber }
