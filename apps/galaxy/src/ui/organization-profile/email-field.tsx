import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components'
import { ProfileSchemaType } from './profile-form'

const EmailField = () => {
  const form = useFormContext<ProfileSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Email</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('contactEmail')}
        placeholder="email@gmail.com"
      />
      <FormFieldError name='contactEmail' />
    </FormFieldContainer>
  )
}

export { EmailField }
