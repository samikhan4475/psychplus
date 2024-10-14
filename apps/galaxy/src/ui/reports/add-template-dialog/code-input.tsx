'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const CodeInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Code
      </FormFieldLabel>
      <TextField.Root
        {...form.register('code')}
        placeholder='Code'
        size="1"
      />
      <FormFieldError name="code" />
    </FormFieldContainer>
  )
}
export { CodeInput }

