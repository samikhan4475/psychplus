'use client'

import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CredentialsVerificationSchemaType } from './schema'

const UsernameInput = () => {
  const form = useFormContext<CredentialsVerificationSchemaType>()

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">User Name</FormFieldLabel>
      <TextField.Root
        size="2"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('username')}
      />
      <FormFieldError name="username" />
    </FormFieldContainer>
  )
}

export { UsernameInput }
