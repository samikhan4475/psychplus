import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect
        size="1"
        exclude={['Archived', 'Deleted']}
        codeset={CODESETS.RecordStatus}
        name="status"
      />
      <FormFieldError name="status" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
