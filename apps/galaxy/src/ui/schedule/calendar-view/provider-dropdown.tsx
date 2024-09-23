import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const ProviderDropdown = () => {
  const providerOptions = useStore((state) => state.providers)

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Provider</FormFieldLabel>
      <SelectInput
        field="provider"
        placeholder="Select"
        options={providerOptions}
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
