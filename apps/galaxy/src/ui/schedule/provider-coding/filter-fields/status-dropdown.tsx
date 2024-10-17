'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const StatusDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.AppointmentStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { StatusDropdown }
