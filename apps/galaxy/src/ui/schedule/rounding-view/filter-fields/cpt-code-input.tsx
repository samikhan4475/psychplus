'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { SchedulerFilters } from '../../types'

const CptCodeInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CptCode)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>CPT Code</FieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder="Add"
        size="1"
        {...form.register('cptCode')}
      />
    </FormFieldContainer>
  )
}

export { CptCodeInput }
