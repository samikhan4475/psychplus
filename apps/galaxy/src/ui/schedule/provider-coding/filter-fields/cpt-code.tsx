'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { ProviderCodingSchema } from '../provider-coding-view-schema'
import { SchedulerFilters } from '../../types'
const CPTCode = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CptCode)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>CPT Code</FormFieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder="Add"
        size="1"
        {...form.register('cptCode')}
      />
    </FormFieldContainer>
  )
}

export { CPTCode }
