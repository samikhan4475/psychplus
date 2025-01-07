'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const EndDateInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>To Date</FieldLabel>
      <DatePickerInput
        field="endingDate"
        minValue={form.watch('startingDate')}
        dateInputClass="h-6"
      />
    </FormFieldContainer>
  )
}

export { EndDateInput }
