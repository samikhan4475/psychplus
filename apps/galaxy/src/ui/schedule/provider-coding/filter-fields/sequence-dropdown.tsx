'use client'

import { CodesetSelect, DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { useVisitSequenceCodeset } from '../../hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const SequenceDropdown = () => {
  const { filters } = useFiltersContext()
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices')
  const options = useCodesetOptions(
    CODESETS.VisitSequence,
    undefined,
    timedVisitSequenceCodes,
  )
  if (!filters.includes(SchedulerFilters.VisitSequence)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Sequence</FieldLabel>
      <DropdownSelect field="visitSequences" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { SequenceDropdown }
