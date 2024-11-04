'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateInputFrom = () => {
  return (
    <FormFieldContainer className="w-full flex-row gap-1">
      <FormFieldLabel className="!text-1">From</FormFieldLabel>
      <DatePickerInput field="fromDate" aria-label="date-to-filter-input" />
    </FormFieldContainer>
  )
}

export { DateInputFrom }
