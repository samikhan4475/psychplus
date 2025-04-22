'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateFromField = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Date From</FormFieldLabel>
      <DatePickerInput yearFormat="YYYY" field="dateFrom" />
    </FormFieldContainer>
  )
}

export { DateFromField }
