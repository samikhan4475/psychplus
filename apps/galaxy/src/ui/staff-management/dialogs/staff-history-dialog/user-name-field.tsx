'use client'

import { AsyncAutoCompleteTextField } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { getStaffListOptionsAction } from '../../actions'

const UserNameField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">User</FormFieldLabel>
      <AsyncAutoCompleteTextField
        field="createdById"
        fetchDataAction={getStaffListOptionsAction}
        className="h-6 w-full"
        placeholder="Search User"
        truncateText={12}
      />
    </FormFieldContainer>
  )
}

export { UserNameField }
