'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateInputTo = () => {
  return (
    <FormFieldContainer className="w-full flex-row gap-1">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <DatePickerInput field="toDate" aria-label="date-to-filter-input" />
    </FormFieldContainer>
  )
}

export { DateInputTo }
