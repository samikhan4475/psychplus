'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../types'

const LastCoverageDateRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.LCD)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>LCD</FormFieldLabel>
      <DatePickerInput field="lastCoverageDateStart" />
      <DatePickerInput field="lastCoverageDateEnd" />
    </FormFieldContainer>
  )
}

export { LastCoverageDateRange }
