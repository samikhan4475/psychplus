'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'
import { SchedulerFilters } from '../../types'
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
        {...form.register('balanceFrom')}
      />
      <TextField.Root
        size="1"
        placeholder="$ To"
        {...form.register('balanceTo')}
      />
    </FormFieldContainer>
  )
}

export { BalanceRange }
