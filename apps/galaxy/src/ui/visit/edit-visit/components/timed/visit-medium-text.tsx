'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const VisitMediumText = () => {
  const form = useFormContext<SchemaType>()
  const isDisabled = true
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('visitMedium')}
        disabled={isDisabled}
        className="h-6 w-full"
      />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

export { VisitMediumText }
