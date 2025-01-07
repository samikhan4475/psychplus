'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const Diagnosis = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Diagnosis)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Diagnosis</FieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder="Diagnosis"
        size="1"
        {...form.register('diagnosisCode')}
      />
    </FormFieldContainer>
  )
}

export { Diagnosis }
