'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const Name = () => {
  const form = useFormContext<ProviderCodingSchema>()

  return (
    <FormFieldContainer className="flex-1 items-start">
      <FieldLabel>Name</FieldLabel>
      <TextField.Root
        placeholder="Search by Name"
        size="1"
        {...form.register('name')}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { Name }
