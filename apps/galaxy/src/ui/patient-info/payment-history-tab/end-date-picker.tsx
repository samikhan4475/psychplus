'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

interface EndDatePickerProps {
  disabled?: boolean
}
const EndDatePicker = ({ disabled }: EndDatePickerProps) => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="whitespace-nowrap !text-1">
        End Date
      </FormFieldLabel>
      <DatePickerInput
        field="endDate"
        className="w-[120px]"
        isDisabled={disabled}
      />
    </FormFieldContainer>
  )
}

export { EndDatePicker }
