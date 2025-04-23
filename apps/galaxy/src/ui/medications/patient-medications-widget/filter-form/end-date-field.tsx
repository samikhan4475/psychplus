'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const EndDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>End Date</FormFieldLabel>
      <DatePickerInput field="endDate" className="w-[120px]" />
    </FormFieldContainer>
  )
}

export { EndDateField }
