'use client'

import { useState } from 'react'
import { Box, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateNoteSchema } from '.'
import { FileUploadCard } from './file-upload-card'
import { PreviewFile } from './preview-file'

const DescriptionTextArea = () => {
  const form = useFormContext<CreateNoteSchema>()
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [textContent, setTextContent] = useState<string | undefined>(undefined)

  const handlePreviewFile = async (file: File) => {
    if (file.type === 'text/plain') {
      const text = await file.text()
      setTextContent(text)
    } else {
      setTextContent(undefined)
    }
    setPreviewFile(file)
  }

  const closePreview = () => {
    setPreviewFile(null)
    setTextContent(undefined)
  }

  const files = form.watch('file') || []

  const handleDeleteFile = (index: number) => {
    const updatedFiles = files.filter((_: File, i: number) => i !== index)
    form.setValue('file', updatedFiles, { shouldDirty: true })
  }

  return (
    <Box className="bg-white p-2 pb-[15px] shadow-2">
      <FormFieldContainer>
        <FormFieldLabel className="text-1 leading-1">
          Description
        </FormFieldLabel>
        <Box className="border-pp-gray-2 flex max-w-[639px] flex-col justify-between rounded-1 border border-solid px-3 py-[14px] outline-none [box-shadow:none]">
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
          <Box className="scrollbar-thin flex gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap">
            {files.map((file: File, index: number) => (
              <FileUploadCard
                key={`${file.name}+${index}`}
                file={file}
                onDelete={() => handleDeleteFile(index)}
                onPreview={handlePreviewFile}
              />
            ))}
          </Box>
          {previewFile && (
            <PreviewFile
              previewFile={previewFile}
              textContent={textContent}
              closePreview={closePreview}
            />
          )}
        </Box>

        <FormFieldError name="description" />
      </FormFieldContainer>
    </Box>
  )
}

export { DescriptionTextArea }
