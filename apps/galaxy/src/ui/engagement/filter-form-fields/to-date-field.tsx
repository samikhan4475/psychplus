'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To Date</FormFieldLabel>
      <DatePickerInput field="dateRangeEnd" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { ToDateField }
