'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { AdditionalContactInfoSchema } from './additional-contact-info-schema'

const HomePhoneInput = () => {
  const form = useFormContext<AdditionalContactInfoSchema>()

  return (
    <FormFieldContainer className="w-44">
      <FormFieldLabel className="!text-1">Home Phone</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Home Phone"
        className={textFieldClassName}
        {...form.register('homePhoneNumber')}
      />
      <FormFieldError name="homePhoneNumber" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { HomePhoneInput }
