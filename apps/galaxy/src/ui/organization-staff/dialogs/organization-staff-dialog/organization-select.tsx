'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const OrganizationSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Organization</FormFieldLabel>
      <CodesetSelect
        name="organization"
        disabled
        codeset={CODESETS.ClaimFiltrationDateType}
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
