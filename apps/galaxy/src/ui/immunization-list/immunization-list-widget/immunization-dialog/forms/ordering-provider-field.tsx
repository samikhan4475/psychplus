import { useCallback } from 'react'
import { getProvidersOptionsAction } from '@/actions'
import {
  AsyncDropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const OrderingProviderField = () => {
  const fetchOptions = useCallback(() => getProvidersOptionsAction(), [])
  return (
    <FormFieldContainer>
      <FormFieldLabel>Ordering Provider</FormFieldLabel>
      <AsyncDropdownSelect
        field="providerStaffId"
        placeholder="Select"
        fetchOptions={fetchOptions}
        className="h-full flex-1"
        buttonClassName="flex-1 h-6"
        shouldDirty
      />
    </FormFieldContainer>
  )
}

export { OrderingProviderField }
