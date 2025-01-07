'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const CoInsuranceRange = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CoInsurance)) return null

  return (
    <FormFieldContainer>
      <FieldLabel className="min-w-10">Co-Ins</FieldLabel>
      <TextField.Root
        className="h-6"
        size="1"
        placeholder="$ From"
        type="number"
        {...form.register('coInsuranceDueMin', {
          setValueAs: (val) => val || undefined,
        })}
      />
      <TextField.Root
        className="h-6"
        size="1"
        placeholder="$ To"
        type="number"
        {...form.register('coInsuranceDueMax', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { CoInsuranceRange }
