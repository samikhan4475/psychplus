import React from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const SeverityBlock = () => {
  return (
    <FormFieldContainer className="w-1/2">
      <FormFieldLabel required>Severity</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        name="severity"
        placeholder="Select"
        codeset={CODESETS.Gender}
      />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}
export default SeverityBlock
