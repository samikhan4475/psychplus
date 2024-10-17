import React from 'react'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const SubmitDateInput = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Submit Date</FormFieldLabel>
      <DatePickerInput className="w-[102px]" field={'submitDate'} />
    </FormFieldContainer>
  )
}

export { SubmitDateInput }
