'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const MemberIDInput = () => {
  const form = useFormContext()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Member ID
      </FormFieldLabel>
      <TextField.Root
        type="text"
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Enter Member ID"
        size="1"
        {...form.register('memberId')}
      />
      <FormFieldError name="memberId" />
    </FormFieldContainer>
  )
}

export { MemberIDInput }
