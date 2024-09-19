'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../schema'

const VisitMediumInput = () => {
  const form = useFormContext<SchemaType>()

  const isDisabled = true

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Visit Medium</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('visitMedium')}
        disabled={isDisabled}
        className="h-[21px]"
      />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

export { VisitMediumInput }
