'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const MediumDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitMedium)) return null


  return (
    <FormFieldContainer>
      <FormFieldLabel>Medium</FormFieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.VisitMedium}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { MediumDropdown }
