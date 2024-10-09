'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ToDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="toDate" className="w-[101px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { ToDateField }
