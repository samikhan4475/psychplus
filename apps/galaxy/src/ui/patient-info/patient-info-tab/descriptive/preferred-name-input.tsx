'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { DescriptiveSchema } from './descriptive-schema'

const PreferredNameInput = () => {
  const form = useFormContext<DescriptiveSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Preferred Name</FormFieldLabel>
      <TextField.Root size="1" {...form.register('preferredName')} />
      <FormFieldError name="preferredName" />
    </FormFieldContainer>
  )
}

export { PreferredNameInput }
