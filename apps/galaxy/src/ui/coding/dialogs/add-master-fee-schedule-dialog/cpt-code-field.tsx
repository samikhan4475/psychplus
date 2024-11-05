'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './schema'

const CptCodeField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>CPT Code</FormFieldLabel>
      <TextField.Root
        size="1"
        maxLength={6}
        {...form.register('cptCode')}
        placeholder="Enter CPT"
      />
      <FormFieldError name="cptCode" />
    </FormFieldContainer>
  )
}

export { CptCodeField }
