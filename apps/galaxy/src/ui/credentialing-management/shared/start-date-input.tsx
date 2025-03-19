'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const StartDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Start Date</FormFieldLabel>
      <DatePickerInput field="startDate" className="w-[101px]" />
    </FormFieldContainer>
  )
}

export { StartDateField }
