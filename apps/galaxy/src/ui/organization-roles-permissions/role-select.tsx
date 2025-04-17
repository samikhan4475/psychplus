'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getAllRolesListOptionsAction } from './actions'

const RoleSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Role</FormFieldLabel>
      <AsyncSelect
        field="roleId"
        size="1"
        buttonClassName="w-[101px]"
        fetchOptions={getAllRolesListOptionsAction}
      />
    </FormFieldContainer>
  )
}

export { RoleSelect }
