'use client'

import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const OrderResultToDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Result To</FormFieldLabel>
        <DatePickerInput field="resultObservationToDate" className="w-[120px]" />
    </FormFieldContainer>
  )
}

export { OrderResultToDateField }
