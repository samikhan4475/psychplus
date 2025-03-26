import React from 'react'
import { useFormContext } from 'react-hook-form'
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
  const form = useFormContext()
  const staffType = form.watch('staffTypeIds.0')
  const filteredRoles = roles.filter((role) => role.value === staffType)

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <SelectInput
        field="staffUserRoleIds.0"
        options={filteredRoles}
        disabled={filteredRoles.length === 0 || staffType === ''}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffUserRoleIds.[0]" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
