'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const DateOfAdmissionRange = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('DOA')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>DOA</FormFieldLabel>
      <DatePickerInput field="doaFrom" />
      <DatePickerInput field="doaTo" />
    </FormFieldContainer>
  )
}

export { DateOfAdmissionRange }
