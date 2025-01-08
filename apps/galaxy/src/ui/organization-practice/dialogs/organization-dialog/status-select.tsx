'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect name="recordStatus" codeset={CODESETS.RecordStatus} />
    </FormFieldContainer>
  )
}

export { StatusSelect }
