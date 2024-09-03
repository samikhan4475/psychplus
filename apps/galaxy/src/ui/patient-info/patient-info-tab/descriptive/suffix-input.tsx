'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { DescriptiveSchema } from './descriptive-schema'

const SuffixInput = () => {
  const form = useFormContext<DescriptiveSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Suffix</FormFieldLabel>
      <TextField.Root size="1" {...form.register('suffix')} />
      <FormFieldError name="suffix" />
    </FormFieldContainer>
  )
}

export { SuffixInput }
