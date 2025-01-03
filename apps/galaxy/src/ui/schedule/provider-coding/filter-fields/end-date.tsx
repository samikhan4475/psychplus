'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput, FormFieldLabel } from '@/components'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FormFieldContainer } from '../../shared'

const EndDate = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>To Date</FormFieldLabel>
      <DatePickerInput
        field="endingDate"
        minValue={form.watch('startingDate') ?? undefined}
      />
    </FormFieldContainer>
  )
}

export { EndDate }
