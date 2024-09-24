'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from '../schema'

const FromDateInput = ({ label, field }: { label: string; field: string }) => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>{label}</FormFieldLabel>
      <DatePickerInput
        field={field}
        granularity="day"
        dateInputClass="h-6"
        maxValue={form.watch('toDate') ?? undefined}
      />
    </FormFieldContainer>
  )
}

export { FromDateInput }
