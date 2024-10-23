'use client'
import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components/form'
import { useFormContext } from 'react-hook-form'
import { FormSchemaType } from '../form-schema'

const NpiField = () => {
  const form = useFormContext<FormSchemaType>()
  
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>NPI</FormFieldLabel>
      <TextField.Root size="1" className="w-[120px]" placeholder="Add NPI" {...form.register('locationNpi')} />
      <FormFieldError name="locationNpi" />
    </FormFieldContainer>
  )
}

export { NpiField }