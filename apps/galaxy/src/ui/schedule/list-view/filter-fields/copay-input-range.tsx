'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const CoPayInputRange = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CoPayment)) return null

  return (
    <FormFieldContainer>
      <FieldLabel className="min-w-10">Co-Pay</FieldLabel>
      <TextField.Root
        size="1"
        placeholder="$ Due"
        type="number"
        {...form.register('copayDueMin', {
          setValueAs: (val) => val || undefined,
        })}
      />
      <TextField.Root
        size="1"
        placeholder="$ Paid"
        type="number"
        {...form.register('copayPaid', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { CoPayInputRange }
