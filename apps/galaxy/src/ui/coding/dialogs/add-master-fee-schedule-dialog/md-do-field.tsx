'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const MdDoField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>MD/DO</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('mdDoAmount')}
        placeholder="MCD $"
      />
      <FormFieldError name="mdDoAmount" />
    </FormFieldContainer>
  )
}

export { MdDoField }
