'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../constants'

const DateOfAdmissionRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.DOA)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>DOA</FormFieldLabel>
      <DatePickerInput field="doaFrom" />
      <DatePickerInput field="doaTo" />
    </FormFieldContainer>
  )
}

export { DateOfAdmissionRange }
