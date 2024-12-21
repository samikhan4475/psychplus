'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDatePicker = () => {
  return (
    <FormFieldContainer className="flex-1 flex-row">
      <FormFieldLabel className="!text-1">Service From</FormFieldLabel>
      <DatePickerInput field="fromServiceDate" />
    </FormFieldContainer>
  )
}

export { FromDatePicker }
