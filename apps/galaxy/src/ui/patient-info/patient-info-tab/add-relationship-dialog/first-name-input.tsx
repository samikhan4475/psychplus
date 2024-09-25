'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddRelationshipSchemaType } from './add-relationship-form'

const FirstNameInput = () => {
  const form = useFormContext<AddRelationshipSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        First Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('firstName')}
      />
      <FormFieldError name="firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
