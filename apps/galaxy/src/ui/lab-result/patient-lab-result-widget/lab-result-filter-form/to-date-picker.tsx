'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDatePicker = () => {
  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Result To</FormFieldLabel>
      <DatePickerInput field="toReferralDate" />
    </FormFieldContainer>
  )
}

export { ToDatePicker }
