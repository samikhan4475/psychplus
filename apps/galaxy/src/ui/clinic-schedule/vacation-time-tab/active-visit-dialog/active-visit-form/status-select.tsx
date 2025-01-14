'use client'

import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0.5">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect size="1" name="status" codeset={CODESETS.VacationStatus} />
    </FormFieldContainer>
  )
}

export { StatusSelect }
