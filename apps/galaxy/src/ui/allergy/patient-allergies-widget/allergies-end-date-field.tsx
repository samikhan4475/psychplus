'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const AllergiesEndDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>End Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="onsetEndDate" className="w-[101px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { AllergiesEndDateField }
