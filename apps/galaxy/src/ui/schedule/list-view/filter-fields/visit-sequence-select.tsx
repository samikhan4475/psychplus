'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitSequenceSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.VisitSequence)
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
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
