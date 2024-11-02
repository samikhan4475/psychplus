'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDatePicker = () => {
  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row">
      <FormFieldLabel className="!text-1">From</FormFieldLabel>
      <DatePickerInput field="fromReferralDate" />
    </FormFieldContainer>
  )
}

export { FromDatePicker }
