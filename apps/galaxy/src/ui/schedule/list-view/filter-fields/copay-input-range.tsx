'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { type ListViewSchema } from '../list-view-schema'
import { SchedulerFilters } from '../../constants'

const CoPayInputRange = () => {
  const form = useFormContext<ListViewSchema>()
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.CoPayment)) return null

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

export { CoPayInputRange }
