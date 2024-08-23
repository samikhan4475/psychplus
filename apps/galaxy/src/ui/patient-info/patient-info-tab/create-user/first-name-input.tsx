'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateUserSchema } from './schema'

const FirstNameInput = () => {
  const form = useFormContext<CreateUserSchema>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>First Name</FormFieldLabel>
      <TextField.Root size="1" {...form.register('firstName')} />
      <FormFieldError name="firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
