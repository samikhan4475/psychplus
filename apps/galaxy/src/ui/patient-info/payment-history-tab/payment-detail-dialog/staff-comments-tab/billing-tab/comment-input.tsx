'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components'
import { AddCommentFormSchemaType } from './add-comment-form'

const CommentInput = () => {
  const form = useFormContext<AddCommentFormSchemaType>()
  return (
    <FormFieldContainer className="w-full gap-1">
      <TextField.Root
        size="1"
        placeholder="Add Comments here"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('comment')}
      />
      <FormFieldError name="comment" />
    </FormFieldContainer>
  )
}

export { CommentInput }
