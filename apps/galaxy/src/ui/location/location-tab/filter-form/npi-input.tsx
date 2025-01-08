'use client'

import { Box, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { LocationFormSchemaType } from './schema'

const NpiInput = () => {
  const form = useFormContext<LocationFormSchemaType>()

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>NPI</FormFieldLabel>
      <Box className="relative">
        <TextField.Root
          size="1"
          placeholder="Add NPI"
          {...form.register('npi')}
        />
        <FormFieldError name="npi" className="absolute" />
      </Box>
    </FormFieldContainer>
  )
}

export { NpiInput }
