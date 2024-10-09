'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const FromDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>From</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="fromDate" className="w-[101px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { FromDateField }
