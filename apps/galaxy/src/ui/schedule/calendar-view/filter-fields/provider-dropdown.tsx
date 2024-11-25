import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const ProviderDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="providerIds"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        className="h-full flex-1"
        buttonClassName="flex-1 h-6"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
