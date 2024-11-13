'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const PaField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>PA</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('paAmount')}
        placeholder="PA $"
      />
      <FormFieldError name="paAmount" />
    </FormFieldContainer>
  )
}

export { PaField }
