'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'

const ZipLast4Input = () => {
  const form = useFormContext<AddPatientSchemaType>()

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Area Code</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Area code"
        type="number"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('contactInfo.addresses.0.zipLast4')}
      />
      <FormFieldError name="contactInfo.addresses.0.zipLast4" />
    </FormFieldContainer>
  )
}

export { ZipLast4Input }
