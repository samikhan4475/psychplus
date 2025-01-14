'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDatePicker = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To</FormFieldLabel>
      <DatePickerInput field="CreatedTo" className="w-[154px]" />
    </FormFieldContainer>
  )
}

export { ToDatePicker }
