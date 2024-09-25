'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../../store'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../constants'

const ProviderDropdown = () => {
  const providerOptions = useStore((state) => state.providers)
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Provider)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Provider</FormFieldLabel>
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
