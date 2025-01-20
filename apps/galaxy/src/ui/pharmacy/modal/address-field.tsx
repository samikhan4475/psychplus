'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { FilterSchemaType } from '../filter-form'

const AddressField = () => {
  const form = useFormContext<FilterSchemaType>()

  return (
    <FormFieldContainer className="flex-col  gap-1">
      <FormFieldLabel>Address</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Address"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('pharmacyAddress')}
      />
    </FormFieldContainer>
  )
}

export { AddressField }
