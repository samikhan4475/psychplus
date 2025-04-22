import { useCallback } from 'react'
import { getProvidersOptionsAction } from '@/actions'
import {
  AsyncDropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ProviderDropdown = () => {
  const fetchOptions = useCallback(() => getProvidersOptionsAction(), [])
  return (
    <FormFieldContainer className="w-[200px] flex-row items-center gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncDropdownSelect
        field="createdById"
        placeholder="Select"
        fetchOptions={fetchOptions}
        className="h-full flex-1"
        buttonClassName="flex-1 h-6"
        shouldDirty
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
