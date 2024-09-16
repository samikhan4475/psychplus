'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const StartDatePicker = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Start Date</FormFieldLabel>
      <DatePickerInput field="startDate" dateInputClass="h-7" />
    </FormFieldContainer>
  )
}

export { StartDatePicker }
