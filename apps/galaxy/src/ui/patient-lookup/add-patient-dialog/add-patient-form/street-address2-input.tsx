'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'

const StreetAddress2Input = () => {
  const form = useFormContext<AddPatientSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Street Address 2</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Street address 2"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('contactInfo.addresses.0.street2')}
      />
      <FormFieldError name="contactInfo.addresses.0.street2" />
    </FormFieldContainer>
  )
}

export { StreetAddress2Input }
