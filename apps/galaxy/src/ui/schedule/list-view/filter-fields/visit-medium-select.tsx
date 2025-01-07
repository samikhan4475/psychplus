'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitMediumSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitMedium)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Medium</FieldLabel>
      <CodesetSelect
        name="visitMedium"
        className="flex-1"
        codeset={CODESETS.VisitMedium}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
