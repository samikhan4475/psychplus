'use client'
import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components/form'
import { useFormContext } from 'react-hook-form'
import { FormSchemaType } from '../form-schema'

const NameField = () => {
  const form = useFormContext<FormSchemaType>()
  
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>Location Name</FormFieldLabel>
      <TextField.Root
        size="1"
        className="w-[120px]"
        placeholder="Add Name"
        {...form.register('locationName')}
      />
      <FormFieldError name="locationName" />
    </FormFieldContainer>
  )
}

export { NameField }