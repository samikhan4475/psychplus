'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components'

const AddCommentField = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-full">
      <TextField.Root
        size="1"
        {...form.register('comment')}
        className={textFieldClassName}
      />
      <FormFieldError name="comment" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { AddCommentField }
