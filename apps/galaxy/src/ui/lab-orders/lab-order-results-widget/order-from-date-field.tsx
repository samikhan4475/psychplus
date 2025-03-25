'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const OrderFromDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>From</FormFieldLabel>
        <DatePickerInput field="orderCreatedFromDate" className="w-[120px]" />
    </FormFieldContainer>
  )
}

export { OrderFromDateField }
