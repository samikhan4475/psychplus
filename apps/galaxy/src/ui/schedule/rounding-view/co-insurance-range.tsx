'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const CoInsuranceRange = () => {
  const form = useFormContext()
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Co-Ins')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel className="min-w-10">Co-Ins</FormFieldLabel>
      <TextField.Root
        className="h-6"
        size="1"
        placeholder="$ From"
        {...form.register('coInsFrom')}
      />
      <TextField.Root
        className="h-6"
        size="1"
        placeholder="$ To"
        {...form.register('coInsTo')}
      />
    </FormFieldContainer>
  )
}

export { CoInsuranceRange }
