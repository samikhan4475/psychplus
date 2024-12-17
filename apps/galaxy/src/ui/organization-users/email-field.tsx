'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './organization-users-list-filter-form'

const EmailField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Email</FormFieldLabel>
      <TextField.Root
        size="1"
        type='email'
        {...form.register('email')}
        placeholder='Email'
      />
    </FormFieldContainer>
  )
}

export { EmailField }
