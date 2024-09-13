'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type AlternativeInfoSchema } from './alternative-info-schema'

const FirstNameInput = () => {
  const form = useFormContext<AlternativeInfoSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1" required>
        First Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        className={textFieldClassName}
        placeholder="First Name"
        {...form.register('firstName')}
      />
      <FormFieldError name="firstName" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { FirstNameInput }
