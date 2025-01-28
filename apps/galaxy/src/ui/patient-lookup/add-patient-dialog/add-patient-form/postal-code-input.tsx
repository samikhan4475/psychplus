'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'
import { preventInvalidZipInput } from '@/utils'


const PostalCodeInput = () => {
  const form = useFormContext<AddPatientSchemaType>()

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Zip</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Zip"
        type="number"
        onKeyDown={preventInvalidZipInput}
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('contactInfo.addresses.0.postalCode')}
      />
      <FormFieldError name="contactInfo.addresses.0.postalCode" />
    </FormFieldContainer>
  )
}

export { PostalCodeInput }
