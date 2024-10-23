'use client'
import { TextField } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { useFormContext } from 'react-hook-form';
import { FormSchemaType } from '../form-schema';

const ZipField = () => {
  const form = useFormContext<FormSchemaType>()
  
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>Zip</FormFieldLabel>
      <TextField.Root
        size="1"
        className="w-[120px]"
        placeholder="Add Postal Code"
        {...form.register('locationZip')}
      />
      <FormFieldError name="locationZip" />
    </FormFieldContainer>
  )
}

export { ZipField }