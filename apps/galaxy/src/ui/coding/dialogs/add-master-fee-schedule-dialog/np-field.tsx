'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const NpField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>NP</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('npAmount')}
        placeholder="NP $"
      />
      <FormFieldError name="npAmount" />
    </FormFieldContainer>
  )
}

export { NpField }
