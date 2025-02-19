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
      <DatePickerInput field="historyCreatedTo" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { ToDateField }
