'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const CardNameField = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Name on Card</FormFieldLabel>
      <TextField.Root
        placeholder="Full name on card"
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('fullname')}
      />
      <FormFieldError name="fullname" />
    </FormFieldContainer>
  )
}

export { CardNameField }
