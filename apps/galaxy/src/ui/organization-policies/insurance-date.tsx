'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const InsuranceDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Insurance Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="insuranceDate" className="w-[101px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { InsuranceDateField }
