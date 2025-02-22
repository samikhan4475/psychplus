'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { ServiceFiltersSchemaType } from './schema'

const AddressInput = () => {
  const form = useFormContext<ServiceFiltersSchemaType>()
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Address</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by address"
        {...form.register('address')}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { AddressInput }
