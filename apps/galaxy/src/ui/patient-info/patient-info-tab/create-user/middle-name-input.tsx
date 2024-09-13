'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateUserSchema } from './create-user-schema'

const MiddleNameInput = () => {
  const form = useFormContext<CreateUserSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Middle Name</FormFieldLabel>
      <TextField.Root
        size="1"
        className={textFieldClassName}
        placeholder="Middle Name"
        {...form.register('middleName')}
      />
      <FormFieldError name="middleName" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { MiddleNameInput }
