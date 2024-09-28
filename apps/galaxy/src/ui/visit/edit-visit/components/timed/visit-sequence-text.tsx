'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const VisitSequenceText = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Visit Sequence</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('visitSequence')}
        disabled
        className="h-[21px]"
      />
      <FormFieldError name="visitSequence" />
    </FormFieldContainer>
  )
}

export { VisitSequenceText }
