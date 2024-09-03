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
      <FormFieldLabel>Home Phone</FormFieldLabel>
      <TextField.Root size="1" {...form.register('homePhoneNumber')} />
      <FormFieldError name="homePhoneNumber" />
    </FormFieldContainer>
  )
}

export { HomePhoneInput }
