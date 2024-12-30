import React from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const ReactionBlock = () => {
  return (
    <FormFieldContainer className="w-1/2">
      <FormFieldLabel required>Reaction</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        name="reaction"
        placeholder="Select"
        codeset={CODESETS.Gender}
      />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export default ReactionBlock
