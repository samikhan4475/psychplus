'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { AdditionalContactInfoSchema } from './additional-contact-info-schema'

const WorkPhoneInput = () => {
  const form = useFormContext<AdditionalContactInfoSchema>()

  return (
    <FormFieldContainer className="w-44">
      <FormFieldLabel className="!text-1">Work Phone</FormFieldLabel>
      <TextField.Root
        size="1"
        className={textFieldClassName}
        placeholder="Work Phone"
        {...form.register('workPhoneNumber')}
      />
      <FormFieldError name="workPhoneNumber" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { WorkPhoneInput }
