import React from 'react'
import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DateToInput = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput className="w-[102px]" field="toDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}
export { DateToInput }
