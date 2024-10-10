'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const Age = () => {
  const form = useFormContext<ProviderCodingSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Age</FormFieldLabel>
      <TextField.Root
        placeholder="Add Age"
        size="1"
        {...form.register('age')}
      />
    </FormFieldContainer>
  )
}

export { Age }
