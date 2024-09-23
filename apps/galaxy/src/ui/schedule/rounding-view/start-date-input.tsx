'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const StartDateInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput field="startDate" />
    </FormFieldContainer>
  )
}

export { StartDateInput }
