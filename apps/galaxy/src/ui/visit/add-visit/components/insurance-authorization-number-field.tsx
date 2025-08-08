'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from '../schema'

const InsuranceAuthNumberField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Insurance Authorization Number</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('authorizationNumber')}
      />
    </FormFieldContainer>
  )
}

export { InsuranceAuthNumberField }
