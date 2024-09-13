'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { DescriptiveSchema } from './descriptive-schema'

const PrefixInput = () => {
  const form = useFormContext<DescriptiveSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Prefix</FormFieldLabel>
      <TextField.Root
        size="1"
        className={textFieldClassName}
        {...form.register('prefix')}
      />
      <FormFieldError name="prefix" />
    </FormFieldContainer>
  )
}

const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { PrefixInput }
