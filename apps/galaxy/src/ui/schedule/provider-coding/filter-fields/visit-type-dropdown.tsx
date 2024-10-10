'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const VisitTypeDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitType)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <CodesetSelect
        name="visitType"
        codeset={CODESETS.AppointmentStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitTypeDropdown }
