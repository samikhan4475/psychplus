'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { AdditionalContactInfoSchema } from './additional-contact-info-schema'

const HomePhoneCommentInput = () => {
  const form = useFormContext<AdditionalContactInfoSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Comment</FormFieldLabel>
      <TextField.Root
        size="1"
        className={textFieldClassName}
        placeholder="Comment"
        {...form.register('homePhoneComment')}
      />
      <FormFieldError name="homePhoneComment" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { HomePhoneCommentInput }
