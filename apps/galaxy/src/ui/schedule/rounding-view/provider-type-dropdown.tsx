'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../constants'

const ProviderTypeDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.ProviderType)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Provider Type</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ProviderType}
        size="1"
        name="providerType"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
