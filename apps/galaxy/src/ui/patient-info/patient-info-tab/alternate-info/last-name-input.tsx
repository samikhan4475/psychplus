'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type AlternativeInfoSchema } from './alternative-info-schema'

const LastNameInput = () => {
  const form = useFormContext<AlternativeInfoSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1" required>
        Last Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Last Name"
        className={textFieldClassName}
        {...form.register('lastName')}
      />
      <FormFieldError name="lastName" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { LastNameInput }
