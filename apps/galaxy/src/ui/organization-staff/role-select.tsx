'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const RoleSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Role</FormFieldLabel>
      <CodesetSelect
        name="status"
        codeset={CODESETS.ClaimFiltrationDateType}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { RoleSelect }
