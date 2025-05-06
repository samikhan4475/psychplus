'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const StartDate = () => {
  return (
    <FormFieldContainer className="flex-row items-start gap-1">
      <FormFieldLabel className="pt-1 !text-1" required>
        Start Date of Schedule
      </FormFieldLabel>
      <DatePickerInput
        field="beginOn"
        className="min-w-[140px]"
        yearFormat="YYYY"
      />
    </FormFieldContainer>
  )
}

export { StartDate }
