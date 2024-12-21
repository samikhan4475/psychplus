'use client'

import { I18nProvider } from 'react-aria-components'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const DepositDateField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Deposit Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="depositDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { DepositDateField }
