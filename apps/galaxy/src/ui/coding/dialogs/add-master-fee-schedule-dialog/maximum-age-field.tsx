import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components'
import { SchemaType } from './schema'

const MaximumAgeField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <TextField.Root
        size="1"
        {...form.register('maximumAge')}
        placeholder="To"
      />
      <FormFieldError name="maximumAge" />
    </FormFieldContainer>
  )
}

export { MaximumAgeField }
