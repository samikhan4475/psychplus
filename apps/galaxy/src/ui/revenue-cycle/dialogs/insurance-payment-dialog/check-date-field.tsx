'use client'

import { I18nProvider } from 'react-aria-components'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const CheckDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Check Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="checkDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { CheckDateField }
