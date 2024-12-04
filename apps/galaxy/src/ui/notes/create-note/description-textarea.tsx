'use client'

import { Box, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateNoteSchema } from '.'
import { FileUploadCard } from './file-upload-card'

const DescriptionTextArea = () => {
  const form = useFormContext<CreateNoteSchema>()
  const fileName = form.getValues('file')?.name

  return (
    <Box className="bg-white p-2 pb-[15px] shadow-2">
      <FormFieldContainer>
        <FormFieldLabel className="text-1 leading-1">
          Description
        </FormFieldLabel>
        <Box className="border-pp-gray-2 flex h-44 max-w-[639px] flex-col justify-between rounded-1 border border-solid px-3 py-[14px] outline-none [box-shadow:none]">
          <TextArea
            placeholder="Description"
            size="1"
            className="h-44 max-w-[639px] border-none outline-none focus:outline-none focus:ring-0"
            style={{
              border: 'none',
              boxShadow: 'none',
            }}
            {...form.register('description')}
          />
          <Box className="mt-auto">{fileName && <FileUploadCard />}</Box>
        </Box>

        <FormFieldError name="description" />
      </FormFieldContainer>
    </Box>
  )
}

export { DescriptionTextArea }
