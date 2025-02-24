import React from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const FIELD_ID = 'state'

const StateField = () => {
  return (
    <FormFieldContainer className="w-1/4">
      <FormFieldLabel required>State</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        name={FIELD_ID}
        placeholder="Select state"
        codeset={CODESETS.UsStates}
        disabled
      />
      <FormFieldError name={FIELD_ID} />
    </FormFieldContainer>
  )
}

export { StateField }
