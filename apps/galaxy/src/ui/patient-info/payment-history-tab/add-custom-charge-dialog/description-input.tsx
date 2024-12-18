'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CustomChargeSchemaType } from './schema'

const DescriptionInput = () => {
  const form = useFormContext<CustomChargeSchemaType>()
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1" required>
        Description
      </FormFieldLabel>
      <TextField.Root
        placeholder="Add description..."
        size="1"
        {...form.register('description')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="description" />
    </FormFieldContainer>
  )
}

export { DescriptionInput }
