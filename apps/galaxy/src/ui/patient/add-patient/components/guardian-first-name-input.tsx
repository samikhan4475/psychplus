'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../schema'

const GuardianFirstNameInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>First Name</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('guardianFirstName')}
        placeholder="First Name"
      />
      <FormFieldError name="guardianFirstName" />
    </FormFieldContainer>
  )
}

export { GuardianFirstNameInput }
