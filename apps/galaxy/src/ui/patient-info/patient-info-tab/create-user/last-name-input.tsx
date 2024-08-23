'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateUserSchema } from './schema'

const LastNameInput = () => {
  const form = useFormContext<CreateUserSchema>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Last Name</FormFieldLabel>
      <TextField.Root size="1" {...form.register('lastName')} />
      <FormFieldError name="lastName" />
    </FormFieldContainer>
  )
}

export { LastNameInput }
