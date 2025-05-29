'use client'

import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './preferred-partner-filter-form'

const AddressField = () => {
  const form = useFormContext<SchemaType>();
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Address</FormFieldLabel>
      <TextField.Root
        size="1"
        type="text"
        {...form.register('address')}
        placeholder="Address"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { AddressField }
