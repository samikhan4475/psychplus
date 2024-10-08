'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useDropdownContext, useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const ProviderDropdown = () => {
  const { providers } = useDropdownContext()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Provider)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <SelectInput
        field="provider"
        placeholder="Select"
        options={providers}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
