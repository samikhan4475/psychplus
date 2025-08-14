'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ReasonCodeField = () => {  
  return (
    <FormFieldContainer>
      <FormFieldLabel>Refusal Reason</FormFieldLabel>
      <CodesetSelect
        className="h-6"
        name="reasonCode"
        codeset={CODESETS.ImmunizationRefusalReason}
        placeholder="Select Refusal Reason"
        size="1"
      />
      <FormFieldError name="reasonCode" />
    </FormFieldContainer>
  )
}

export { ReasonCodeField } 