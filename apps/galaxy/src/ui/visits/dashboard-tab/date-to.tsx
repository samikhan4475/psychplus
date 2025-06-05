'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateTo = () => {
  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <DatePickerInput field="dateTo" />
    </FormFieldContainer>
  )
}

export { DateTo }
