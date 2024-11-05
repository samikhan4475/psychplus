'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const NpPaField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>NP/PA</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('npPaAmount')}
        placeholder="MCD $"
      />
      <FormFieldError name="npPaAmount" />
    </FormFieldContainer>
  )
}

export { NpPaField }
