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
        className={textFieldClassName}
        {...form.register('text')}
      />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none] max-w-[315px]'
export { CommentInput }
