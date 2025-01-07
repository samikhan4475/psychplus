import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderDropdown = () => {
  return (
    <FormFieldContainer>
      <FieldLabel>Provider</FieldLabel>
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
