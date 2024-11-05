'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDatePicker = () => {
  return (
    <FormFieldContainer className="w-[174px] flex-row items-start gap-1">
      <FormFieldLabel className="pt-0.5 !text-1">From</FormFieldLabel>
      <DatePickerInput field="createdFrom" />
    </FormFieldContainer>
  )
}

export { FromDatePicker }
