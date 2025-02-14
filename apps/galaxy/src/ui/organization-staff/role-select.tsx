'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const RoleSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Role</FormFieldLabel>
      <CodesetSelect
        name="roleCodes.[0]"
        codeset={CODESETS.StaffRole}
        size="1"
        className="w-[calc(100%-35px)]"
      />
    </FormFieldContainer>
  )
}

export { RoleSelect }
