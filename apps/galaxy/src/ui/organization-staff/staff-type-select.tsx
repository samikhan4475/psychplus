'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getOrganizationStaffRolesOptionsAction } from './actions'

const StaffTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Staff Type</FormFieldLabel>
      <AsyncSelect
        field="staffType"
        fetchOptions={getOrganizationStaffRolesOptionsAction}
        size="1"
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
