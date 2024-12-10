import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'

interface StaffRoleSelectProps {
  roles: SelectOptionType[]
}

const StaffRoleSelect = ({ roles }: StaffRoleSelectProps) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <SelectInput
        field="staffUserRoleIds.0"
        options={roles}
        disabled={roles.length === 0}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffUserRoleIds.[0]" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
