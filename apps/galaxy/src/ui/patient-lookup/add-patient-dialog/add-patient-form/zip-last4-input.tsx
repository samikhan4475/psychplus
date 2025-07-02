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
      <FormFieldLabel className="!text-1">Postal+4</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Postal+4"
        type="number"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('contactInfo.addresses.0.postalPlus4Code')}
      />
      <FormFieldError name="contactInfo.addresses.0.postalPlus4Code" />
    </FormFieldContainer>
  )
}

export { ZipLast4Input }
