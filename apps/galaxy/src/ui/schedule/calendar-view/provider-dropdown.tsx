import { FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'
import { FormFieldContainer } from '../shared'

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
        buttonClassName='flex-1 h-6'
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
