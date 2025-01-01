'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const BalanceRange = () => {
  const form = useFormContext<ProviderCodingSchema>()
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

export { BalanceRange }
