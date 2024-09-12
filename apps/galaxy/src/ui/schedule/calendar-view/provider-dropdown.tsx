import { FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'
import { FormFieldContainer } from './form-field-container'

const ProviderDropdown = () => {
  const providerOptions = useStore((state) => state.providers)

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Provider</FormFieldLabel>
      <SelectInput
        field="provider"
        placeholder="Select"
        options={providerOptions}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
