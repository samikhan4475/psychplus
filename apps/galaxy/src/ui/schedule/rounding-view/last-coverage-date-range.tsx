'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const LastCoverageDateRange = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('LCD')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>LCD</FormFieldLabel>
      <DatePickerInput field="lcdFrom" />
      <DatePickerInput field="lcdTo" />
    </FormFieldContainer>
  )
}

export { LastCoverageDateRange }
