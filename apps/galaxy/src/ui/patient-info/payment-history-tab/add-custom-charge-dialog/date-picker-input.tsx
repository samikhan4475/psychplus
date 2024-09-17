'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DatePickerField = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1 !font-medium">Date</FormFieldLabel>
      <DatePickerInput field="date" className="h-7" />
    </FormFieldContainer>
  )
}

export { DatePickerField }
