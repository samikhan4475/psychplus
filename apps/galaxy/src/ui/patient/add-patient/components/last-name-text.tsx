'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../schema'

const LastNameInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Last Name</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('lastName')}
        placeholder="Enter Last Name"
      />
      <FormFieldError name="lastName" />
    </FormFieldContainer>
  )
}

export { LastNameInput }
