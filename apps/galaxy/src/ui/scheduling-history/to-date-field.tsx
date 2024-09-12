'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center">
      <FormFieldLabel>To</FormFieldLabel>
      <DatePickerInput field="dateTo" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { ToDateField }
