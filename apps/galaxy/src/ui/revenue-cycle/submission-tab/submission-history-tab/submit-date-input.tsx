import React from 'react'
import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const SubmitDateInput = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Submit Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput className="w-[102px]" field="submittedDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { SubmitDateInput }
