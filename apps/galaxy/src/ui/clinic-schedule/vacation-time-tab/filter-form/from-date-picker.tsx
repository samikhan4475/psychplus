'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDatePicker = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput field="CreatedFrom" className="w-[154px]" />
    </FormFieldContainer>
  )
}

export { FromDatePicker }
