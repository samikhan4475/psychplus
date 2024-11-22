import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'

const PasswordField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel>Password</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('password')}
      />
    </FormFieldContainer>
  )
}

export { PasswordField }
