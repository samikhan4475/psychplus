'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const BalanceInputRange = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Balance)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Balance</FieldLabel>
      <TextField.Root
        size="1"
        placeholder="$ Due"
        type="number"
        {...form.register('balanceDueMin', {
          setValueAs: (val) => val || undefined,
        })}
      />
      <TextField.Root
        size="1"
        placeholder="$ Paid"
        type="number"
        {...form.register('balancePaid', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { BalanceInputRange }
