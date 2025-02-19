'use client'

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
    <FormFieldContainer className="flex-1 gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        size="1"
        name="vacationStatus"
        codeset={CODESETS.VacationStatus}
        className="w-full"
      />
      <FormFieldError name="vacationStatus" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
