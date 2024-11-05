'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const DescriptionField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Description</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('description')}
        placeholder="Description"
      />
      <FormFieldError name="description" />
    </FormFieldContainer>
  )
}

export { DescriptionField }
