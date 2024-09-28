'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../schema'

const EmailInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>
        Email
      </FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('email')}
        placeholder="example@gmail.com "
      />
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}

export { EmailInput }
