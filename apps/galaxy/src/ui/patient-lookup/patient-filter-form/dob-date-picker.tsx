'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DOBDatePicker = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">DOB</FormFieldLabel>
      <DatePickerInput field="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DOBDatePicker }
