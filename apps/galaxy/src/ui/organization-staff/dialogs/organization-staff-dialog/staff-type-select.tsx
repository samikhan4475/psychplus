import React from 'react'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getOrganizationStaffTypesOptionsAction } from '../../actions'

const StaffTypeSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Staff Type</FormFieldLabel>
      <AsyncSelect
        field="staffType"
        fetchOptions={getOrganizationStaffTypesOptionsAction}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffType" />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
