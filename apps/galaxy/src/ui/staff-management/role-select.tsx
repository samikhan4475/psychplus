'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const RoleSelect = () => {
  const options = useCodesetOptions(CODESETS.StaffRole)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Role</FormFieldLabel>
      <DropdownSelect field="staffRoleCode" options={options} />
    </FormFieldContainer>
  )
}
export { RoleSelect }
