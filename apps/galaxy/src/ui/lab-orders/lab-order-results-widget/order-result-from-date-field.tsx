'use client'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const OrderResultFromDateField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Result From</FormFieldLabel>
        <DatePickerInput field="resultObservationFromDate" className="w-[120px]" />
    </FormFieldContainer>
  )
}

export { OrderResultFromDateField }
