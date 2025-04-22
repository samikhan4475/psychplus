'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateToField = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Date To</FormFieldLabel>

      <DatePickerInput yearFormat="YYYY" field="dateTo" />
    </FormFieldContainer>
  )
}

export { DateToField }
