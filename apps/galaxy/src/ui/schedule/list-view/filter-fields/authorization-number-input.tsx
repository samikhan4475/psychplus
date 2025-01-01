'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'
import { BookedAppointmentsSchemaType } from '../../schema'

const AuthorizationNumberInput = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.AuthorizationNumber)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Auth #</FormFieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder='Auth #'
        size="1"
        {...form.register('insuranceAuthorizationNumber')}
      />
    </FormFieldContainer>
  )
}

export { AuthorizationNumberInput }
