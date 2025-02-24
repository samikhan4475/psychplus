'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../add-codeset-form'

const SourceUpdateDays = ({ disabled }: { disabled: boolean }) => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Source Update Days</FormFieldLabel>
      <TextField.Root
        size="1"
        type="number"
        {...form.register('sourceUpdateDays')}
        placeholder="Enter source update days"
        min={0}
        disabled={disabled}
      />

      <FormFieldError name="sourceUpdateDays" />
    </FormFieldContainer>
  )
}

export { SourceUpdateDays }
