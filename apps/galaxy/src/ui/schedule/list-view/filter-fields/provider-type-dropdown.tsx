'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

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
