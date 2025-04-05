import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { EXCLUDED_PROVIDER_TYPES } from '../../constants'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderTypeDropdown = () => {
  const options = useCodesetOptions(
    CODESETS.ProviderType,
    undefined,
    EXCLUDED_PROVIDER_TYPES,
  )
  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <DropdownSelect field="providerTypes" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
