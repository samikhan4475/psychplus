'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const Address2Field = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="col-span-3 w-full">
      <FormFieldLabel>Address 2</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Address 2"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('address2')}
      />
      <FormFieldError name="address2" />
    </FormFieldContainer>
  )
}

export { Address2Field }
