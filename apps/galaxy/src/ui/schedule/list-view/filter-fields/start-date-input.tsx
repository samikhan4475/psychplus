'use client'

import { CalendarDate } from '@internationalized/date'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DatePickerInput } from '@/components'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const StartDateInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>From Date</FieldLabel>
      <DatePickerInput
        field="startingDate"
        maxValue={form.watch('endingDate') ?? undefined}
        dateInputClass="h-6"
        minValue={new CalendarDate(2000, 1, 1)}
      />
    </FormFieldContainer>
  )
}

export { StartDateInput }
