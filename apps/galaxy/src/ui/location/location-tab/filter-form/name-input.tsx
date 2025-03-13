'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { LocationFormSchemaType } from './schema'

const NameInput = () => {
  const form = useFormContext<LocationFormSchemaType>()

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Location Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter name"
        {...form.register('locationName')}
      />
      <FormFieldError name="locationName" />
    </FormFieldContainer>
  )
}

export { NameInput }
