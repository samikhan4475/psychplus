'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { AdditionalContactInfoSchema } from './additional-contact-info-schema'

const WorkPhoneExtInput = () => {
  const form = useFormContext<AdditionalContactInfoSchema>()

  return (
    <FormFieldContainer className="w-16">
      <FormFieldLabel>Ext</FormFieldLabel>
      <TextField.Root size="1" {...form.register('workPhoneExtension')} />
      <FormFieldError name="workPhoneExtension" />
    </FormFieldContainer>
  )
}

export { WorkPhoneExtInput }
