'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDatePicker = () => {
  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row">
      <FormFieldLabel className="!text-1">Result From</FormFieldLabel>
      <DatePickerInput field="dateFrom" />
    </FormFieldContainer>
  )
}

export { FromDatePicker }
