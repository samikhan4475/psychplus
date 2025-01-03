'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const StartDate = () => {
  const form = useFormContext<ProviderCodingSchema>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>From Date</FormFieldLabel>
      <DatePickerInput
        field="startingDate"
        maxValue={form.watch('endingDate') ?? undefined}
      />
    </FormFieldContainer>
  )
}

export { StartDate }
