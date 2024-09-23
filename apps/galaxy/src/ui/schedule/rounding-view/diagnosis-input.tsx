'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const DiagnosisInput = () => {
  const form = useFormContext()
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Diagnosis')) return null

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
