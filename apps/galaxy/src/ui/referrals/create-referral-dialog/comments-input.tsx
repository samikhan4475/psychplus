'use client'

import { TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { type SchemaType } from './create-referral-form'

const CommentsInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="col-span-full">
      <FormFieldLabel className="!text-1">Comments</FormFieldLabel>
      <TextArea
        size="1"
        id="comments"
        placeholder="Add a comment"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
        rows={5}
        {...form.register('comments')}
      />
      <FormFieldError name="comments" />
    </FormFieldContainer>
  )
}

export { CommentsInput }
