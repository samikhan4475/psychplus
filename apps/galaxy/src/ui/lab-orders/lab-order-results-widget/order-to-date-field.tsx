'use client'

import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const OrderToDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To</FormFieldLabel>
        <DatePickerInput field="orderCreatedToDate" className="w-[120px]" />
    </FormFieldContainer>
  )
}

export { OrderToDateField }
