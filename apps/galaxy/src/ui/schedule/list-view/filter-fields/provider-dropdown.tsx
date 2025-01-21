'use client'

import { getProvidersOptionsAction } from '../../client-actions'
import { AsyncSelect } from '@/components'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const ProviderDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Provider)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Provider</FieldLabel>
      <AsyncSelect
        field="providerIds"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6 truncate max-w-[10px] min-w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
