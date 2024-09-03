'use client'

import { Box, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateNoteSchema } from '.'

const DescriptionTextArea = () => {
  const form = useFormContext<CreateNoteSchema>()

  return (
    <Box className="bg-white p-2 pb-[15px] shadow-2">
      <FormFieldContainer>
        <FormFieldLabel className="text-1 leading-1">
          Description
        </FormFieldLabel>
        <TextArea
          placeholder="Description"
          size="1"
          className="border-pp-gray-2 h-44 max-w-[639px] rounded-1 border border-solid px-3 py-[14px] outline-none [box-shadow:none]"
          {...form.register('description')}
        />
        <FormFieldError name="description" />
      </FormFieldContainer>
    </Box>
  )
}

export { DescriptionTextArea }
