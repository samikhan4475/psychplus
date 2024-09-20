'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const Address1Field = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="col-span-3 w-full">
      <FormFieldLabel>Address 1</FormFieldLabel>
      <TextField.Root
        placeholder="Address 1"
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('address1')}
      />
      <FormFieldError name="address1" />
    </FormFieldContainer>
  )
}

export { Address1Field }
