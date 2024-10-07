'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDataPicker = () => {
  return (
    <FormFieldContainer className="w-[154px] flex-row items-start gap-1">
      <FormFieldLabel className="pt-0.5 !text-1">From</FormFieldLabel>
      <DatePickerInput field="historyCreatedFrom" className="" />
    </FormFieldContainer>
  )
}

export { FromDataPicker }
