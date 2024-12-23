'use client'

import { I18nProvider } from 'react-aria-components'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { getCalendarDate } from '@/utils'

const ReceivedDateField = () => {
  const todayDate = getCalendarDate(new Date().toISOString())
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Received Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput maxValue={todayDate} field="receivedDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { ReceivedDateField }
