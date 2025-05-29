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

const PasswordInput = () => {
  const form = useFormContext<CredentialsVerificationSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Password</FormFieldLabel>
      <TextField.Root
        type="password"
        size="2"
        className="border-pp-gray-2  w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('password')}
      />
      <FormFieldError name="password" />
    </FormFieldContainer>
  )
}

export { PasswordInput }
