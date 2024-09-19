'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

const VisitMediumSelect = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Visit Medium')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Medium</FormFieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.VisitMedium}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
