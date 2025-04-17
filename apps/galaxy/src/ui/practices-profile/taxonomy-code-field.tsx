import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { ProfileSchemaType } from './profile-form'

const TaxonomyCodeField = () => {
  const form = useFormContext<ProfileSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Taxonomy Code</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('taxonomy')}
        placeholder="Taxonomy Code"
      />
      <FormFieldError name="taxonomy" />
    </FormFieldContainer>
  )
}

export { TaxonomyCodeField }
