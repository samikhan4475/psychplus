import React from 'react'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getOrganizationStaffRolesOptionsAction } from '../../actions'

const StaffRoleSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <AsyncSelect
        field="staffUserRoleIds"
        fetchOptions={getOrganizationStaffRolesOptionsAction}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffUserRoleIds" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
