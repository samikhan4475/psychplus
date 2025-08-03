'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDatePicker = () => {
  return (
    <FormFieldContainer className="w-[174px] flex-row items-start gap-1">
      <FormFieldLabel className="pt-0.5 !text-1">To</FormFieldLabel>
      <DatePickerInput field="historyCreatedTo" />
    </FormFieldContainer>
  )
}

export { ToDatePicker }
