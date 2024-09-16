'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { InsuranceSchemaType } from './schema'

interface TerminationDatePickerProps {
  minDate: string
}
const TerminationDatePicker = ({ minDate }: TerminationDatePickerProps) => {
  const form = useFormContext<InsuranceSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Termination Date
      </FormFieldLabel>
      <TextField.Root
        type="date"
        max={minDate}
        data-testid="effective-date-input"
        {...form.register('effectiveDate')}
        className="h-7 w-full text-1"
      />
    </FormFieldContainer>
  )
}

export { TerminationDatePicker }
