'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const DateOfAdmissionRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.DOA)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>DOA</FormFieldLabel>
      <DatePickerInput field="dateOfAdmissionStart" />
      <DatePickerInput field="dateOfAdmissionEnd" />
    </FormFieldContainer>
  )
}

export { DateOfAdmissionRange }
