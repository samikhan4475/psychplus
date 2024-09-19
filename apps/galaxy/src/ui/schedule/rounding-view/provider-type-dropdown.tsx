'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

const ProviderTypeDropdown = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Provider Type')) return null

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
