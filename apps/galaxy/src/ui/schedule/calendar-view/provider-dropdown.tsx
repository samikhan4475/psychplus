import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useDropdownContext } from '../context'

const ProviderDropdown = () => {
  const { providers } = useDropdownContext()

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Provider</FormFieldLabel>
      <SelectInput
        field="provider"
        placeholder="Select"
        options={providers}
        className="h-full flex-1"
        buttonClassName='flex-1 h-6'
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
