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
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect
        name="status"
        codeset={CODESETS.RecordStatus}
        className="text-1"
      />
      <FormFieldError name="status" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
