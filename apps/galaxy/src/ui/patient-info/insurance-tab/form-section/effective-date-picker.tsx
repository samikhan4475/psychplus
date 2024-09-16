'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

interface EffectiveDatePickerProps {
  maxDate: string
}
const EffectiveDatePicker = ({ maxDate }: EffectiveDatePickerProps) => {
  const form = useFormContext<InsuranceSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Effective Date
      </FormFieldLabel>
      <TextField.Root
        type="date"
        max={maxDate}
        data-testid="effective-date-input"
        {...form.register('effectiveDate')}
        className="h-7 w-full text-1"
      />
      <FormFieldError name="effectiveDate" />
    </FormFieldContainer>
  )
}

export { EffectiveDatePicker }
