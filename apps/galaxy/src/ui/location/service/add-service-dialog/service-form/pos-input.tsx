'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ServiceSchemaType } from './schema'

const PlaceOfServiceInput = () => {
  const form = useFormContext<ServiceSchemaType>()
  return (
    <FormFieldContainer className="col-span-3 gap-1">
      <FormFieldLabel>Place of Service (POS)</FormFieldLabel>
      <TextField.Root
        size="1"
        className="h-7"
        disabled
        placeholder="POS"
        {...form.register('servicePlace')}
      />
    </FormFieldContainer>
  )
}
export { PlaceOfServiceInput }
