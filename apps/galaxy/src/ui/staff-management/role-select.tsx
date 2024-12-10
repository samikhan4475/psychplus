import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useStore } from './store'

const StaffRoleSelect = () => {
  const roles = useStore((state) => state.dropDownOptions.roles)
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Role</FormFieldLabel>
      <SelectInput
        options={roles}
        disabled={roles.length === 0}
        field="staffUserRoleIds.[0]"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffUserRoleIds.[0]" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
