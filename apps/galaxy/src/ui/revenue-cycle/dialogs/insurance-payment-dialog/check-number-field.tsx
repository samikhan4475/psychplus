'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './insurance-payment-form'

const CheckNumberField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Check Number</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('checkNumber')}
        placeholder="123456"
      />
      <FormFieldError name="checkNumber" />
    </FormFieldContainer>
  )
}

export { CheckNumberField }
