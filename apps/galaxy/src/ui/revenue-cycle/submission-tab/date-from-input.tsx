import React from 'react'
import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateFromInput = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="min-w-fit">From</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput className="w-[102px]" field="fromDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}
export { DateFromInput }
