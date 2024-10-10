'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const BalanceInputRange = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Balance)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Balance</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="$ From"
        type="number"
        {...form.register('balanceDueMin', {
          setValueAs: (val) => val || undefined,
        })}
      />
      <TextField.Root
        size="1"
        placeholder="$ To"
        type="number"
        {...form.register('balanceDueMax', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { BalanceInputRange }
