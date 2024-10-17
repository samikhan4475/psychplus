'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel
} from '@/components'

const StartDate = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1" required>
        Start Date
      </FormFieldLabel>
      <DatePickerInput field="startDate" className="min-w-[120px]" />
    </FormFieldContainer>
  )
}

export { StartDate }

