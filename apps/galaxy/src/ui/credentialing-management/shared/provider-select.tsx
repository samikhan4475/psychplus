import { useCallback } from 'react'
import { getProvidersOptionsAction } from '../client-actions/get-provider-options'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const ProviderSelect = () => {
  const fetchOptions = useCallback(() => getProvidersOptionsAction(), [])
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="providerStaffId"
        placeholder="Select"
        fetchOptions={fetchOptions}
        buttonClassName="w-full h-6 truncate max-w-[10px] min-w-full"
        className="h-full w-[101px] flex-1"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
