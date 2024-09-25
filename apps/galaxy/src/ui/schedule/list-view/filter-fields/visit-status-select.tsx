'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../constants'

const VisitStatusSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitStatus)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.VisitStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
