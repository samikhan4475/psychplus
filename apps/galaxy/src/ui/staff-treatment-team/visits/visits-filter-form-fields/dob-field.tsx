'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const DobField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>DOB</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="dateOfBirth" className="w-[190px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { DobField }
