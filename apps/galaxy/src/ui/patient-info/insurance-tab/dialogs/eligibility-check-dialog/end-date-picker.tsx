'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const EndDatePicker = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">End Date</FormFieldLabel>
      <DatePickerInput field="endDate" dateInputClass="h-7" />
    </FormFieldContainer>
  )
}

export { EndDatePicker }
