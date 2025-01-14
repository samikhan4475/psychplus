'use client'

import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        size="1"
        name="recordStatus"
        codeset={CODESETS.VacationStatus}
        className="w-[120px]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
