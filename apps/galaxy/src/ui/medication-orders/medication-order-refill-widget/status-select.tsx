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
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect
        name="recordStatuses"
        codeset={CODESETS.RecordStatus}
        size="1"
        exclude={['Deleted', 'Archived']}
        className="h-full flex-1"
      />
      <FormFieldError name="recordStatuses" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
