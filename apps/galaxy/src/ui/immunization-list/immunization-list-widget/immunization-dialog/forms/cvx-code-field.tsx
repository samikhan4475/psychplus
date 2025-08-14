'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const CvxCodeField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>CVX Code</FormFieldLabel>
      <TextField.Root
        readOnly={true}
        {...form.register('cvxCode')}
        className="h-6"
        size="1"
      />
      <FormFieldError name="cvxCode" />
    </FormFieldContainer>
  )
}

export { CvxCodeField }
