'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DatePickerField = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1 !font-medium" required>
        Date
      </FormFieldLabel>
      <DatePickerInput field="chargeDate" dateInputClass="h-7" />
    </FormFieldContainer>
  )
}

export { DatePickerField }
