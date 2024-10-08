'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitTypeSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitType)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <CodesetSelect
        name="visitType"
        className="flex-1"
        codeset={CODESETS.AppointmentStatus}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
