'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface EmailInputProps {
  disabled?: boolean
}

const EmailInput = ({ disabled }: EmailInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        Email
      </FormFieldLabel>
      <TextField.Root
        size="1"
        type="email"
        placeholder="Enter email"
        disabled={disabled}
        {...form.register('email')}
      />
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}

export { EmailInput }
