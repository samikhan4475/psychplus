'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const LengthOfStayRange = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.LOS)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>LOS</FieldLabel>
      <TextField.Root
        className="h-6"
        placeholder="From"
        size="1"
        type="number"
        {...form.register('lengthOfStayMin', {
          setValueAs: (val) => val || undefined,
        })}
      />
      <TextField.Root
        className="h-6"
        placeholder="To"
        size="1"
        type="number"
        {...form.register('lengthOfStayMax', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { LengthOfStayRange }
