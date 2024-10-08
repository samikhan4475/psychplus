'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../types'

const VisitStatus = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.AppointmentStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitStatus }
