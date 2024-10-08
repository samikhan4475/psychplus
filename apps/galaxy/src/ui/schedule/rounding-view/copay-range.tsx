'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const CoPayRange = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CoPayment)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel className="min-w-10">Co-Pay</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="$ From"
        type="number"
        {...form.register('copayDueMin', {
          setValueAs: (val) => val || undefined,
        })}
      />
      <TextField.Root
        size="1"
        placeholder="$ To"
        type="number"
        {...form.register('copayDueMax', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { CoPayRange }
