'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'

const CptCodeInput = () => {
  const form = useFormContext()
  const { filters } = useFiltersContext()
  if (!filters.includes('CPT Code')) return null

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

export { CptCodeInput }
