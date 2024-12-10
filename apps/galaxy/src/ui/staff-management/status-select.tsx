'use client'

import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="w-[calc(100%-35px)] flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="statuses.0"
        size="1"
        codeset={CODESETS.RecordStatus}
        exclude={['Archived', 'Deleted']}
      />
    </FormFieldContainer>
  )
}
export { StatusSelect }
