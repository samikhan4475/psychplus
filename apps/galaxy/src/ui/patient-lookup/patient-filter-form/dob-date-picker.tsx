'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DOBDatePicker = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">DOB</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="dateOfBirth" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { DOBDatePicker }
