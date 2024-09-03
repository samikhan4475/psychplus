'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { DescriptiveSchema } from './descriptive-schema'

const PrefixInput = () => {
  const form = useFormContext<DescriptiveSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Prefix</FormFieldLabel>
      <TextField.Root size="1" {...form.register('prefix')} />
      <FormFieldError name="prefix" />
    </FormFieldContainer>
  )
}

export { PrefixInput }
