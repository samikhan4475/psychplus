'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { ActiveVisitSchemaType } from './schema'

const NameInput = () => {
  const form = useFormContext<ActiveVisitSchemaType>()

  return (
    <FormFieldContainer className="gap-0.5">
      <FormFieldLabel>Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Add Name"
        {...form.register('name')}
        className="h-6 w-full"
      />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { NameInput }
