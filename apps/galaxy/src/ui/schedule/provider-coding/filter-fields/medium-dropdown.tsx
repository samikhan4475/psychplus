'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const MediumDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitMedium)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Medium</FieldLabel>
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
