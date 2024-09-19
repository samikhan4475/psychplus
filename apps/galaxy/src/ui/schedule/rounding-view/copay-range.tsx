'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

const CoPayRange = () => {
  const form = useFormContext()
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Co-Pay')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel className="min-w-10">Co-Pay</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="$ From"
        {...form.register('copayFrom')}
      />
      <TextField.Root
        size="1"
        placeholder="$ To"
        {...form.register('copayTo')}
      />
    </FormFieldContainer>
  )
}

export { CoPayRange }
