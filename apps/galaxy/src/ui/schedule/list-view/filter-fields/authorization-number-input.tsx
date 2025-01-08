'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const AuthorizationNumberInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.AuthorizationNumber)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Auth #</FieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder="Auth #"
        size="1"
        type="number"
        {...form.register('insuranceAuthorizationNumber')}
      />
    </FormFieldContainer>
  )
}

export { AuthorizationNumberInput }
