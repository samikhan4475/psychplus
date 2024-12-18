'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CredentialsSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Credentials</FormFieldLabel>
      <CodesetSelect name="status" codeset={CODESETS.ClaimFiltrationDateType} />
    </FormFieldContainer>
  )
}

export { CredentialsSelect }
