'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'
import { SchedulerFilters } from '../../types'

const Diagnosis = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Diagnosis)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Diagnosis</FormFieldLabel>
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
