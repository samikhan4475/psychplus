import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { EXCLUDED_PROVIDER_TYPES } from '../../constants'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const ProviderTypeDropdown = () => {
  const options = useCodesetOptions(
    CODESETS.ProviderType,
    undefined,
    EXCLUDED_PROVIDER_TYPES,
  )
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.ProviderType)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <DropdownSelect field="providerTypes" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
