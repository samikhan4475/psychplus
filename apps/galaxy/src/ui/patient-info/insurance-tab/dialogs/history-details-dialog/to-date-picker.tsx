'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDataPicker = () => {
  return (
    <FormFieldContainer className="w-[154px] flex-row gap-1">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <DatePickerInput field="ToDate" />
    </FormFieldContainer>
  )
}

export { ToDataPicker }
