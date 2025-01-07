'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FieldLabel, FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../types'
import { useVisitSequenceCodeset } from '../hooks'

const VisitSequenceSelect = () => {
  const { filters } = useFiltersContext()
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices')
  if (!filters.includes(SchedulerFilters.VisitSequence)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Visit Sequence</FieldLabel>
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
