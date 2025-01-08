'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const StatusInput = () => {
  return (
    <FormFieldContainer className="flex flex-col gap-0.5">
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect
        name="recordStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
      />
      <FormFieldError name="recordStatus" />
    </FormFieldContainer>
  )
}

export { StatusInput }
