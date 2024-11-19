'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './receiver-form'

const SubmissionDirectoryField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Submission Directory</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-[var(--chip-height)] w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('submissionDirectory')}
      />
      <FormFieldError name="submissionDirectory" />
    </FormFieldContainer>
  )
}

export { SubmissionDirectoryField }
