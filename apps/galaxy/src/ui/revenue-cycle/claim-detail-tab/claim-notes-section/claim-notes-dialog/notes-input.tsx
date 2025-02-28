'use client'

import { TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../schema'

const NotesInput = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="w-full gap-1">
      <FormFieldLabel required>Notes</FormFieldLabel>
      <TextArea
        placeholder="Notes here"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        size="1"
        maxLength={300}
        {...form.register("note")}
      />
      <FormFieldError name="note" />
    </FormFieldContainer>
  )
}

export { NotesInput }
