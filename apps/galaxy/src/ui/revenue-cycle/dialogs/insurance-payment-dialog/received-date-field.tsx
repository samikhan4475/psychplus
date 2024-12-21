'use client'

import { I18nProvider } from 'react-aria-components'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ReceivedDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Received Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="receivedDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { ReceivedDateField }
