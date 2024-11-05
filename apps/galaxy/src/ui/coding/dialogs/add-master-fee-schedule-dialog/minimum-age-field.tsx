import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components'
import { SchemaType } from './schema'

const MinimumAgeField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <TextField.Root
        size="1"
        {...form.register('minimumAge')}
        placeholder="From"
      />
      <FormFieldError name="minimumAge" />
    </FormFieldContainer>
  )
}

export { MinimumAgeField }
