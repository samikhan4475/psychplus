'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const FundingSourceField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Funding Source</FormFieldLabel>
      <CodesetSelect
        className="h-6"
        name="fundingCode"
        codeset={CODESETS.ImmunizationFundingSource}
        placeholder="Select Funding Source"
        size="1"
      />
      <FormFieldError name="fundingCode" />
    </FormFieldContainer>
  )
}

export { FundingSourceField }
