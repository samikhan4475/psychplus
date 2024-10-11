'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components'
import { TreatmentCommentFormSchemaType } from '../treatment-tab/treatment-comment-form'

const TreatmentCommentInput = () => {
  const form = useFormContext<TreatmentCommentFormSchemaType>()
  return (
    <FormFieldContainer className="w-full gap-1">
      <TextField.Root
        placeholder="Add Comments here"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        size="1"
        {...form.register('comment')}
      />
      <FormFieldError name="comment" />
    </FormFieldContainer>
  )
}

export { TreatmentCommentInput }
