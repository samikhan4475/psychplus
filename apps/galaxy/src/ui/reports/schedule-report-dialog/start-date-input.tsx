'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel
} from '@/components'
import { I18nProvider } from 'react-aria-components'

const StartDate = () => {
  return (
    <FormFieldContainer className="flex-row items-start gap-1">
      <FormFieldLabel className="!text-1" required>
        Start Date of Schedule
      </FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="beginOn" className="min-w-[140px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { StartDate }

