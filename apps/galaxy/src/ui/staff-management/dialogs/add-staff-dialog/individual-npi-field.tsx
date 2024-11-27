import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from './schema'

const IndividualNpiField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Individual NPI</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('npi')}
        maxLength={10}
        placeholder="Add NPI"
      />
      <FormFieldError name="npi" />
    </FormFieldContainer>
  )
}

export { IndividualNpiField }
