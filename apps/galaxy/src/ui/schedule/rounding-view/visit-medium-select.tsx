'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FieldLabel, FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { useFormContext } from 'react-hook-form'
import { BookedAppointmentsSchemaType } from '../schema'
import { SchedulerFilters } from '../types'

const VisitMediumSelect = () => {
  const { filters } = useFiltersContext()
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const visitMedium = form.watch('visitMedium')
  if (!filters.includes(SchedulerFilters.VisitMedium)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Medium</FieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.VisitMedium}
        value={visitMedium}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
