'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

interface StartDatePickerProps {
  disabled?: boolean
}
const StartDatePicker = ({ disabled }: StartDatePickerProps) => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Start Date</FormFieldLabel>
      <DatePickerInput
        field="startDate"
        className="w-[120px]"
        isDisabled={disabled}
      />
    </FormFieldContainer>
  )
}

export { StartDatePicker }
