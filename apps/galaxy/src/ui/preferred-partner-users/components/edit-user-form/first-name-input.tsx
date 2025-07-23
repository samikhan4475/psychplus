'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface FirstNameInputProps {
  disabled?: boolean
}

const FirstNameInput = ({ disabled = false }: FirstNameInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>
        First Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter first name"
        disabled={disabled}
        {...form.register('firstName')}
      />
      <FormFieldError name="firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
