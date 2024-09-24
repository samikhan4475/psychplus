'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { useUpdateDuration } from '../hook'
import { SchemaType } from '../schema'

const TimeInput = ({ label, field }: { label: string; field: string }) => {
  const form = useFormContext<SchemaType>()
  useUpdateDuration()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>{label}</FormFieldLabel>
      <TextField.Root
        type="time"
        size="1"
        {...form.register(field as keyof SchemaType)}
        color="gray"
        variant="surface"
        radius="small"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { TimeInput }
