import React from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const StateBlock = () => {
  return (
    <FormFieldContainer className="w-1/4">
      <FormFieldLabel required>State</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        name="state"
        placeholder="Select"
        codeset={CODESETS.Gender}
      />
      <FormFieldError name="state" />
    </FormFieldContainer>
  )
}

export default StateBlock
