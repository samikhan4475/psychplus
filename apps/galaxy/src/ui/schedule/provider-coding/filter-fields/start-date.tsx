'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const StartDate = () => {
  const form = useFormContext<ProviderCodingSchema>()
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>From Date</FieldLabel>
      <DatePickerInput
        field="startingDate"
        maxValue={form.watch('endingDate') ?? undefined}
        dateInputClass="h-6"
      />
    </FormFieldContainer>
  )
}

export { StartDate }
