'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { type ListViewSchema } from '../list-view-schema'
import { SchedulerFilters } from '../../constants'

const AuthorizationNumberInput = () => {
  const form = useFormContext<ListViewSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.AuthorizationNumber)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Auth #</FormFieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder='Auth #'
        size="1"
        {...form.register('authorizationNumber')}
      />
    </FormFieldContainer>
  )
}

export { AuthorizationNumberInput }
