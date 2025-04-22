'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const StartDateField = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Start Date</FormFieldLabel>
      <DatePickerInput field="dateTo" />
    </FormFieldContainer>
  )
}

export { StartDateField }
