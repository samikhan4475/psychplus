'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const CommentInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="text-1">Text</FormFieldLabel>
      <TextField.Root
        placeholder="Add text here..."
        size="1"
        className="border-pp-gray-2 h-6 w-full max-w-[315px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('partialComment')}
      />
    </FormFieldContainer>
  )
}

export { CommentInput }
