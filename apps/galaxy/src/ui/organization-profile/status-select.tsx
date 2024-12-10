import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.RecordStatus} name="status" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
