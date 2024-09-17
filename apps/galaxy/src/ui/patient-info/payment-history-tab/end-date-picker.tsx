'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const EndDatePicker = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="whitespace-nowrap !text-1">
        End Date
      </FormFieldLabel>
      <DatePickerInput field="endDate" className="w-[120px]" />
    </FormFieldContainer>
  )
}

export { EndDatePicker }
