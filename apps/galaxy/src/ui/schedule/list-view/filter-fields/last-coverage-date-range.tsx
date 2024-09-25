'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../constants'

const LastCoverageDateRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.LCD)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>LCD</FormFieldLabel>
      <DatePickerInput field="lcdFrom" />
      <DatePickerInput field="lcdTo" />
    </FormFieldContainer>
  )
}

export { LastCoverageDateRange }
