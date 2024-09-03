'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateUserSchema } from './create-user-schema'

const MiddleNameInput = () => {
  const form = useFormContext<CreateUserSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Middle Name</FormFieldLabel>
      <TextField.Root size="1" {...form.register('middleName')} />
      <FormFieldError name="middleName" />
    </FormFieldContainer>
  )
}

export { MiddleNameInput }
