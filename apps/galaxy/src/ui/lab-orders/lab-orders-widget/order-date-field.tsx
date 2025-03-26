'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const OrderDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="orderCreatedDate" className="w-[120px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { OrderDateField }
