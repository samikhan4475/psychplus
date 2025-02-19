'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const VisitMediumSelect = () => {
  const { filters } = useFiltersContext()
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const options = useCodesetOptions(CODESETS.VisitMedium)
  if (!filters.includes(SchedulerFilters.VisitMedium)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Medium</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('visitMediums')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('visitMediums', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
