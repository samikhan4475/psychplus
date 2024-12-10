import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        size="1"
        codeset={CODESETS.RecordStatus}
        exclude={['Archived', 'Deleted']}
        name="status"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
