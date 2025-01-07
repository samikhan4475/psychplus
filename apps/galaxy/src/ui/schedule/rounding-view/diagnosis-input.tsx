'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FieldLabel, FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { SchedulerFilters } from '../types'

const DiagnosisInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Diagnosis)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Diagnosis</FieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder='Diagnosis'
        size="1"
        {...form.register('diagnosisCode')}
      />
    </FormFieldContainer>
  )
}

export { DiagnosisInput }
