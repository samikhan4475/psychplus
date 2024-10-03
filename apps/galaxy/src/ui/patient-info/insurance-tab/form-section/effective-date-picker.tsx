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
        size="1"
        max={maxDate}
        data-testid="effective-date-input"
        {...form.register('effectiveDate')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
      />
      <FormFieldError name="effectiveDate" />
    </FormFieldContainer>
  )
}

export { EffectiveDatePicker }
