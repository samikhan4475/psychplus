'use client'

import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const MediumDropdown = () => {
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.VisitMedium)
  if (!filters.includes(SchedulerFilters.VisitMedium)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Medium</FieldLabel>
      <DropdownSelect field="visitMediums" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { MediumDropdown }
