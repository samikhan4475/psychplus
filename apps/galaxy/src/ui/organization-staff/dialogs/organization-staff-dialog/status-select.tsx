'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect name="status" codeset={CODESETS.ClaimFiltrationDateType} />
    </FormFieldContainer>
  )
}

export { StatusSelect }
