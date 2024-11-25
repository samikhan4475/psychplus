'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const ProviderDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Provider)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="providerIds"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
