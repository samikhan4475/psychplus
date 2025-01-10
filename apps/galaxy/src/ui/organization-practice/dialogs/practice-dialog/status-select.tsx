'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect name="recordStatus" codeset={CODESETS.RecordStatus} />
      <FormFieldError name="recordStatus" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
