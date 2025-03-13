'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { LocationSchemaType } from './schema'

const GMBInput = () => {
  const form = useFormContext<LocationSchemaType>()
  return (
    <FormFieldContainer className="col-span-full  gap-1">
      <FormFieldLabel>GMB Link</FormFieldLabel>
      <TextField.Root
        placeholder="https//www.google.com/maps/place/Psychplus/@LocationCoordinates/reviews"
        size="1"
        {...form.register('locationGoogleLink')}
      />
      <FormFieldError name="locationGoogleLink" />
    </FormFieldContainer>
  )
}

export { GMBInput }
