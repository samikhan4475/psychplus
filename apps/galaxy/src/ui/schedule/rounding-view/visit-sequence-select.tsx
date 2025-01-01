'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../types'
import { useVisitSequenceCodeset } from '../hooks'

const VisitSequenceSelect = () => {
  const { filters } = useFiltersContext()
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices')
  if (!filters.includes(SchedulerFilters.VisitSequence)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Visit Sequence</FormFieldLabel>
      <CodesetSelect
        name="visitSequence"
        codeset={CODESETS.VisitSequence}
        exclude={timedVisitSequenceCodes}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
