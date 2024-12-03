'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const EndDateField = () => {
  return (
    <FormFieldContainer className="flex-1 flex-row items-center gap-1">
      <FormFieldLabel>End Date</FormFieldLabel>
      <DatePickerInput field="endDate" />
    </FormFieldContainer>
  )
}

export { EndDateField }
