'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../add-codeset-form'

const VersionInput = ({ disabled }: { disabled: boolean }) => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Version</FormFieldLabel>
      <TextField.Root
        size="1"
        type="number"
        {...form.register('version')}
        placeholder="Enter version"
        min={0}
        disabled={disabled}
      />
      <FormFieldError name="version" />
    </FormFieldContainer>
  )
}

export { VersionInput }
