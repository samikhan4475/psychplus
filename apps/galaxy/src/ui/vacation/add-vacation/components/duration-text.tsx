'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { cn } from '@/utils'
import { SchemaType } from '../schema'

const DurationText = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Duration</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('duration')}
        color="gray"
        variant="soft"
        radius="small"
        className={cn(
          'border-pp-gray-2 h-6 border border-solid bg-gray-3 text-gray-11 p-0',
        )}
        disabled
      />
      <FormFieldError name="duration" />
    </FormFieldContainer>
  )
}

export { DurationText }
