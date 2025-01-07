'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { useVisitSequenceCodeset } from '../../hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const SequenceDropdown = () => {
  const { filters } = useFiltersContext()
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices')
  if (!filters.includes(SchedulerFilters.VisitSequence)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Sequence</FieldLabel>
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

export { SequenceDropdown }
