'use client'

import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const EndDate = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>To</FormFieldLabel>
      <DatePickerInput field="endingDate" />
    </FormFieldContainer>
  )
}

export { EndDate }
