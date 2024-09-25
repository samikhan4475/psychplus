'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddRelationshipSchemaType } from './add-relationship-form'

const AddressInput = () => {
  const form = useFormContext<AddRelationshipSchemaType>()
  return (
    <FormFieldContainer className="col-span-2 w-full">
      <FormFieldLabel className="!text-1">Address</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('address')}
      />
      <FormFieldError name="address" />
    </FormFieldContainer>
  )
}

export { AddressInput }
