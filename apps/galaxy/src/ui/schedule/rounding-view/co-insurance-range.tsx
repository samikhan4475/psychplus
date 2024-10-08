'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const CoInsuranceRange = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CoInsurance)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel className="min-w-10">Co-Ins</FormFieldLabel>
      <TextField.Root
        className="h-6"
        size="1"
        placeholder="$ From"
        type="number"
        {...form.register('coInsuranceDueMin', {
          setValueAs: (val) => val || undefined,
        })}
      />
      <TextField.Root
        className="h-6"
        size="1"
        placeholder="$ To"
        type="number"
        {...form.register('coInsuranceDueMax', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { CoInsuranceRange }
