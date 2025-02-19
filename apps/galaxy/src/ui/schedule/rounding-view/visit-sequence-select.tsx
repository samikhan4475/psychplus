'use client'

import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../context'
import { useVisitSequenceCodeset } from '../hooks'
import { BookedAppointmentsSchemaType } from '../schema'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const VisitSequenceSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const timedVisitSequenceCodes = useVisitSequenceCodeset('TimedServices')
  const options = useCodesetOptions(
    CODESETS.VisitSequence,
    '',
    timedVisitSequenceCodes,
  )
  if (!filters.includes(SchedulerFilters.VisitSequence)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Visit Sequence</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('visitSequences')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('visitSequences', values, { shouldDirty: true })
        }}
      />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
