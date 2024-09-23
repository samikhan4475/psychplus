'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const VisitSequenceSelect = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Visit Sequence')) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Visit Sequence</FormFieldLabel>
      <CodesetSelect
        name="visitSequence"
        codeset={CODESETS.VisitSequence}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
