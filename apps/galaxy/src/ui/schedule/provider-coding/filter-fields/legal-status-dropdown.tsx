'use client'

import { DropdownSelect } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const LegalStatusDropdown = () => {
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.LegalStatus, undefined, [
    CODE_NOT_SET,
  ])
  if (!filters.includes(SchedulerFilters.Legal)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Legal</FieldLabel>
      <DropdownSelect field="legalStatuses" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { LegalStatusDropdown }
