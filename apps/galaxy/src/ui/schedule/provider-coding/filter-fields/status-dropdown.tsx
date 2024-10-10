'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const StatusDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.VisitStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { StatusDropdown }
