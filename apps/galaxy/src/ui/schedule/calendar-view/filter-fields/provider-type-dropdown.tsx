import { DropdownSelect } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderTypeDropdown = () => {
  const options = useCodesetOptions(CODESETS.ProviderType, undefined, [
    CODE_NOT_SET,
  ])
  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <DropdownSelect field="providerTypes" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
