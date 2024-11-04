import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ClaimProcessedSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Claim Processed as</FormFieldLabel>
      <CodesetSelect
        name="processedAsCode"
        codeset={CODESETS.ProcessedAsCode}
        size="1"
        className="min-w-fit w-[280px] bg-transparent"
      />
    </FormFieldContainer>
  )
}

export { ClaimProcessedSelect }
