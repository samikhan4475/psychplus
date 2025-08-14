'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'
const CvxDescriptionField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>CVX Description</FormFieldLabel>
      <TextField.Root
        {...form.register('cvxDescription')}
        className="h-6"
        readOnly={true}
        size="1"
      />
      <FormFieldError name="cvxDescription" />
    </FormFieldContainer>
  )
}

export { CvxDescriptionField }
