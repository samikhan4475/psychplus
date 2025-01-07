'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const CPTCode = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CptCode)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>CPT Code</FieldLabel>
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
