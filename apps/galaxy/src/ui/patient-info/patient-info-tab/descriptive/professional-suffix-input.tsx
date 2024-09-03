'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { DescriptiveSchema } from './descriptive-schema'

const CommentInput = () => {
  const form = useFormContext<DescriptiveSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Comment</FormFieldLabel>
      <TextField.Root size="1" {...form.register('professionalSuffix')} />
      <FormFieldError name="ProffesionalSuffix" />
    </FormFieldContainer>
  )
}

export { CommentInput }
