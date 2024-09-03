'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { AdditionalContactInfoSchema } from './additional-contact-info-schema'

const HomePhoneExtInput = () => {
  const form = useFormContext<AdditionalContactInfoSchema>()

  return (
    <FormFieldContainer className="w-16">
      <FormFieldLabel>Ext</FormFieldLabel>
      <TextField.Root size="1" {...form.register('homePhoneExt')} />
      <FormFieldError name="homePhoneExt" />
    </FormFieldContainer>
  )
}

export { HomePhoneExtInput }
