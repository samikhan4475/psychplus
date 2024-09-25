'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type AddRelationshipSchemaType } from './add-relationship-form'

const EmailInput = () => {
  const form = useFormContext<AddRelationshipSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Email
      </FormFieldLabel>
      <TextField.Root
        size="1"
        type="email"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('email')}
      />
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}
export { EmailInput }
