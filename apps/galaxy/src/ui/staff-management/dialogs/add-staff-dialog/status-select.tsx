import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        size="1"
        exclude={['Archived', 'Deleted']}
        codeset={CODESETS.RecordStatus}
        name="status"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
