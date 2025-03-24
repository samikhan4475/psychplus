'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { ServiceFiltersSchemaType } from './schema'

const LocationNameInput = () => {
  const form = useFormContext<ServiceFiltersSchemaType>()
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Location Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter name"
        {...form.register('locationName')}
      />
    </FormFieldContainer>
  )
}

export { LocationNameInput }
