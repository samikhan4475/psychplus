'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddCardFormSchemaType } from './add-card-form'

const CardNameField = () => {
  const form = useFormContext<AddCardFormSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Name on Card</FormFieldLabel>
      <TextField.Root
        placeholder="Full name on card"
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('name')}
      />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { CardNameField }
