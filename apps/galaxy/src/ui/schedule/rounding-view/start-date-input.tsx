'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { BookedAppointmentsSchemaType } from '../schema'
import { FieldLabel, FormFieldContainer } from '../shared'

const StartDateInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>From Date</FieldLabel>
      <DatePickerInput
        field="startingDate"
        maxValue={form.watch('endingDate') ?? undefined}
      />
    </FormFieldContainer>
  )
}

export { StartDateInput }
