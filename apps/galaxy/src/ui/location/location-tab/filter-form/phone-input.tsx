'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { LocationFormSchemaType } from './schema'

const PhoneInput = () => {
  const form = useFormContext<LocationFormSchemaType>()

  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>Phone</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter Phone"
        {...form.register('Phone')}
      />
      <FormFieldError name="Phone" />
    </FormFieldContainer>
  )
}

export { PhoneInput }
