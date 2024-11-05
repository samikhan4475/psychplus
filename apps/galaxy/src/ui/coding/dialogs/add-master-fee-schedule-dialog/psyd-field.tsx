'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const PsyDField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>PsyD</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('paDAmount')}
        placeholder="MCD $"
      />
      <FormFieldError name="paDAmount" />
    </FormFieldContainer>
  )
}

export { PsyDField }
