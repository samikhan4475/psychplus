'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const NdcCodeField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel required>NDC Code</FormFieldLabel>
      <TextField.Root
        {...form.register('ndcCode')}
        className="h-6"
        readOnly={true}
        size="1"
      />
      <FormFieldError name="ndcCode" />
    </FormFieldContainer>
  )
}

export { NdcCodeField }
