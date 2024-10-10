import { AsyncSelect, FormFieldLabel } from '@/components'
import { getProvidersOptionsAction } from '../actions'
import { FormFieldContainer } from '../shared'

const ProviderDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Provider</FormFieldLabel>
      <AsyncSelect
        field="provider"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        className="h-full flex-1"
        buttonClassName="flex-1 h-6"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
