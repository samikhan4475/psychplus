'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components'
import { BillingCommentFormSchemaType } from './billing-comment-form'

const BillingCommentInput = () => {
  const form = useFormContext<BillingCommentFormSchemaType>()
  return (
    <FormFieldContainer className="w-full gap-1">
      <TextField.Root
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Add Comments here"
        {...form.register('comment')}
        size="1"
      />
      <FormFieldError name="comment" />
    </FormFieldContainer>
  )
}

export { BillingCommentInput }
