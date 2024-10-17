'use client'

import { TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type SchemaType } from './insurance-payment-form'

const CommentsTextarea = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-1 leading-1">Comments</FormFieldLabel>
      <TextArea
        size="1"
        className="border-pp-gray-2 h-20 max-w-full rounded-1 border border-solid px-3 py-[14px] outline-none [box-shadow:none]"
        {...form.register('comments')}
        placeholder="Comment here..."
      />
      <FormFieldError name="comments" />
    </FormFieldContainer>
  )
}

export { CommentsTextarea }
