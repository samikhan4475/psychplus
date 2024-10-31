import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ClaimProcessedSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Claim Processed as</FormFieldLabel>
      <CodesetSelect
        name="processedAs"
        codeset={CODESETS.Gender}
        size="1"
        className="w-[230px] bg-transparent"
      />
    </FormFieldContainer>
  )
}

export { ClaimProcessedSelect }
