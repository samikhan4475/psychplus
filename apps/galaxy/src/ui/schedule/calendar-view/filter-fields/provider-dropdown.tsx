import { useCallback } from 'react'
import { AsyncSelect } from '@/components'
import { getProvidersOptionsAction } from '../../client-actions'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderDropdown = () => {
  const fetchOptions = useCallback(() => getProvidersOptionsAction(), [])
  return (
    <FormFieldContainer>
      <FieldLabel>Provider</FieldLabel>
      <AsyncSelect
        field="providerIds"
        placeholder="Select"
        fetchOptions={fetchOptions}
        className="h-full flex-1"
        buttonClassName="flex-1 h-6"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
