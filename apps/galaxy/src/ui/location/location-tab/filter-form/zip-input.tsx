'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { LocationFormSchemaType } from './schema'

const ZipInput = () => {
  const form = useFormContext<LocationFormSchemaType>()

  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>Zip</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter Postal Code"
        {...form.register('zip')}
      />
      <FormFieldError name="zip" />
    </FormFieldContainer>
  )
}

export { ZipInput }
