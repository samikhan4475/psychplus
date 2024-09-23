'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const LengthOfStayRange = () => {
  const form = useFormContext()
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('LOS')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>LOS</FormFieldLabel>
      <TextField.Root
        className="h-6"
        placeholder="From"
        size="1"
        type="number"
        {...form.register('losFrom')}
      />
      <TextField.Root
        className="h-6"
        placeholder="To"
        size="1"
        type="number" 
        {...form.register('losTo')}
      />
    </FormFieldContainer>
  )
}

export { LengthOfStayRange }
