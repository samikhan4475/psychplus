'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput field="historyCreatedFrom" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { FromDateField }
