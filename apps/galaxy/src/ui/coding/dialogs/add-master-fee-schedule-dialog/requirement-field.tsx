'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const RequirementField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Requirement</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('requirement')}
        placeholder="Requirements..."
      />
      <FormFieldError name="requirement" />
    </FormFieldContainer>
  )
}

export { RequirementField }
