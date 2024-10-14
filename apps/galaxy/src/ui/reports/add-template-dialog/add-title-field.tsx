'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const TitleInputField = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Add Title
      </FormFieldLabel>
      <TextField.Root
        {...form.register('title')}
        placeholder='Add Description'
        size="1"
      />
      <FormFieldError name="title" />
    </FormFieldContainer>
  )
}
export { TitleInputField }

