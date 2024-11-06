'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'

const CityInput = () => {
  const form = useFormContext<AddPatientSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">City</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="City"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('contactInfo.addresses.0.city')}
      />
      <FormFieldError name="contactInfo.addresses.0.city" />
    </FormFieldContainer>
  )
}

export { CityInput }
