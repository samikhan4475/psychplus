import { useCallback } from 'react'
import {
  AsyncDropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getStaffOptionsAction } from '../../actions/get-staff-options'

const AdministatedDropdown = () => {
  const fetchOptions = useCallback(() => getStaffOptionsAction(), [])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Administered By</FormFieldLabel>
      <AsyncDropdownSelect
        field="administeringUserId"
        placeholder="Select"
        fetchOptions={fetchOptions}
        className="h-full flex-1"
        buttonClassName="flex-1 h-6"
        shouldDirty
      />
    <FormFieldError name="administeringUserId" />
    </FormFieldContainer>
  )
}

export { AdministatedDropdown }
