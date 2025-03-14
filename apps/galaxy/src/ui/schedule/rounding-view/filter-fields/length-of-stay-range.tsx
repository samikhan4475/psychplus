'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { SchedulerFilters } from '../../types'

const LengthOfStayRange = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.LOS)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>LOS</FieldLabel>
      <TextField.Root
        className="h-6"
        placeholder="From"
        size="1"
        type="number"
        {...form.register('lengthOfStayMin', {
          setValueAs: (val) => val || undefined
        })}
      />
      <TextField.Root
        className="h-6"
        placeholder="To"
        size="1"
        type="number" 
        {...form.register('lengthOfStayMax', {
          setValueAs: (val) => val || undefined
        })}      />
    </FormFieldContainer>
  )
}

export { LengthOfStayRange }
