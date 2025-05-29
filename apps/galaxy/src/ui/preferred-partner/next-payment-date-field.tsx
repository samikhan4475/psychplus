'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const NextPaymentField = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Next Payment Date</FormFieldLabel>
      <DatePickerInput field="nextPaymentDate" />
    </FormFieldContainer>
  )
}

export { NextPaymentField }
