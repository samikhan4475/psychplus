import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StaffRoleSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Role</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.StaffRole} name="staffRoleId" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
