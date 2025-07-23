'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface LastNameInputProps {
  disabled?: boolean
}

const LastNameInput = ({ disabled = false }: LastNameInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>
        Last Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter last name"
        disabled={disabled}
        {...form.register('lastName')}
      />
      <FormFieldError name="lastName" />
    </FormFieldContainer>
  )
}

export { LastNameInput }
