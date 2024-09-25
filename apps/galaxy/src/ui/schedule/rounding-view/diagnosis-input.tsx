'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../constants'

const DiagnosisInput = () => {
  const form = useFormContext()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Diagnosis)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Diagnosis</FormFieldLabel>
      <TextField.Root
        className="flex-1"
        placeholder='Diagnosis'
        size="1"
        {...form.register('diagnosis')}
      />
    </FormFieldContainer>
  )
}

export { DiagnosisInput }
