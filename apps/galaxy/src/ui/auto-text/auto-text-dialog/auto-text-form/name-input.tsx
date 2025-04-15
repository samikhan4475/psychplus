'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AutoTextSchemaType } from './schema'

const NameInput = () => {
  const form = useFormContext<AutoTextSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1" required>
        Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('name')}
      />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { NameInput }
