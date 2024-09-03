'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateNoteSchema } from '.'

const TimeInput = () => {
  const form = useFormContext<CreateNoteSchema>()

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px] leading-[16px]">
        Time
      </FormFieldLabel>
      <TextField.Root
        type="time"
        size="1"
        {...form.register('time')}
        color="gray"
        variant="surface"
        className="border-pp-gray-2 border border-solid [box-shadow:none]"
      />
      <FormFieldError name="time" />
    </FormFieldContainer>
  )
}

export { TimeInput }
