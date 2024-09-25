'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components'
import { CommentSchemaType } from './schema'

const AddCommentField = () => {
  const form = useFormContext<CommentSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <TextField.Root
        size="1"
        {...form.register('staffComment')}
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffComment" />
    </FormFieldContainer>
  )
}

export { AddCommentField }
