'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const VisitSequenceSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitSequence)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Visit Sequence</FormFieldLabel>
        <CodesetSelect
          name="visitSequence"
          codeset={CODESETS.VisitSequence}
          className='flex-1'
          size="1"
        />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
