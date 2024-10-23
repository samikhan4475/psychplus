'use client'
import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components/form'
import { useFormContext } from 'react-hook-form'
import { FormSchemaType } from '../form-schema'

const PhoneField = () => {
  const form = useFormContext<FormSchemaType>()

  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>Phone</FormFieldLabel>
      <TextField.Root
        size="1"
        className="w-[120px]"
        placeholder="Add Phone"
        {...form.register('locationPhone')}
      />
      <FormFieldError name="locationPhone" />
    </FormFieldContainer>
  )
}

export { PhoneField }