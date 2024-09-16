'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const GroupNumberInput = () => {
  const form = useFormContext()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Group Number
      </FormFieldLabel>
      <TextField.Root
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Enter group number"
        size="1"
        {...form.register('groupNumber')}
      />
      <FormFieldError name="groupNumber" />
    </FormFieldContainer>
  )
}

export { GroupNumberInput }
