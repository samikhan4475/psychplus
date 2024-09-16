'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDataPicker = () => {
  return (
    <FormFieldContainer className="w-[154px] flex-row gap-1">
      <FormFieldLabel className="!text-1">From</FormFieldLabel>
      <DatePickerInput field="fromDate" />
    </FormFieldContainer>
  )
}

export { FromDataPicker }
