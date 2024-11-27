import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from './schema'

const FirstNameField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel required>First Name</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('legalName.firstName')}
      />
      <FormFieldError name="legalName.firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameField }
