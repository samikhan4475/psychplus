'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PatientInfoSchemaType } from '../patient-info-schema'

const CommentInput = () => {
  const form = useFormContext<PatientInfoSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Comment</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('contactDetails.mobileNumber.comment')}
      />
      <FormFieldError name="contactDetails.mobileNumber.comment" />
    </FormFieldContainer>
  )
}

export { CommentInput }
