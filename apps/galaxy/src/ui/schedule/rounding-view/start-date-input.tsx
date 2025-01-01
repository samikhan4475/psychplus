'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput, FormFieldLabel } from '@/components'
import { BookedAppointmentsSchemaType } from '../schema'
import { FormFieldContainer } from '../shared'

const StartDateInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>From</FormFieldLabel>
      <DatePickerInput
        field="startingDate"
        maxValue={form.watch('endingDate') ?? undefined}
      />
    </FormFieldContainer>
  )
}

export { StartDateInput }
