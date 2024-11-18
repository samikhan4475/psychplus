import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'

const EmailField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Email</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('contactInfo.email')}
      />
    </FormFieldContainer>
  )
}

export { EmailField }
