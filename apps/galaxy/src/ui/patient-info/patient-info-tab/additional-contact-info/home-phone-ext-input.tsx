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
      <FormFieldLabel className="!text-1">Ext</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Ext"
        className={textFieldClassName}
        {...form.register('homePhoneExt')}
      />
      <FormFieldError name="homePhoneExt" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { HomePhoneExtInput }
