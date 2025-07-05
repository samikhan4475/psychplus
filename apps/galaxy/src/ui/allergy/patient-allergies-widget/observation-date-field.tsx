'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const ObservationDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Observation Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="onsetBegan" className="w-[101px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { ObservationDateField }
