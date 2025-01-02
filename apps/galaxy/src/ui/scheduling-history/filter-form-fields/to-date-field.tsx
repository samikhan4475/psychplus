'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center">
      <FormFieldLabel>To Date</FormFieldLabel>
      <DatePickerInput field="toDate" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { ToDateField }
