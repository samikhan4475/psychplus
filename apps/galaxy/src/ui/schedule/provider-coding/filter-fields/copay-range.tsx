'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const CoPayRange = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CoPayment)) return null

  return (
    <FormFieldContainer>
      <FieldLabel className="min-w-10">Co-Pay</FieldLabel>
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
