'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const MastersField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Masters</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('mastersAmount')}
        placeholder="MCD $"
      />
      <FormFieldError name="mastersAmount" />
    </FormFieldContainer>
  )
}

export { MastersField }
