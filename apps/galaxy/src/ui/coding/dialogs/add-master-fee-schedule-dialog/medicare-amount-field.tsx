'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const MedicareAmountField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Medicare Amount</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('medicareAmount')}
        placeholder="MCD $"
      />
      <FormFieldError name="medicareAmount" />
    </FormFieldContainer>
  )
}

export { MedicareAmountField }
