import React from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const FrequencyBlock = () => {
  return (
    <FormFieldContainer className="w-1/2">
      <FormFieldLabel required>Frequency</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        name="frequency"
        placeholder="Select"
        codeset={CODESETS.Gender}
      />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export default FrequencyBlock
