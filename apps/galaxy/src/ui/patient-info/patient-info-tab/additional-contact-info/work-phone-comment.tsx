'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { AdditionalContactInfoSchema } from './additional-contact-info-schema'

const WorkPhoneCommentInput = () => {
  const form = useFormContext<AdditionalContactInfoSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Comment</FormFieldLabel>
      <TextField.Root size="1" {...form.register('workPhoneComment')} />
      <FormFieldError name="workPhoneComment" />
    </FormFieldContainer>
  )
}

export { WorkPhoneCommentInput }
