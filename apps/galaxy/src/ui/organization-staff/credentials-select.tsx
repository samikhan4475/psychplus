'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CredntialsSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Credentials</FormFieldLabel>
      <CodesetSelect
        name="status"
        codeset={CODESETS.ClaimFiltrationDateType}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { CredntialsSelect }
