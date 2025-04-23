'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const WrittenDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Written Date</FormFieldLabel>
      <DatePickerInput field="writtenDate" className="w-[120px]" />
    </FormFieldContainer>
  )
}

export { WrittenDateField }
