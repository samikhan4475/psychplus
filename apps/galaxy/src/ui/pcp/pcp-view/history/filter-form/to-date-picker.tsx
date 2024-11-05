'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const ToDatePicker = () => {
  return (
    <FormFieldContainer className="w-[174px] flex-row gap-1">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <DatePickerInput field="createdTo" />
      <FormFieldError name="createdTo" />
    </FormFieldContainer>
  )
}

export { ToDatePicker }
