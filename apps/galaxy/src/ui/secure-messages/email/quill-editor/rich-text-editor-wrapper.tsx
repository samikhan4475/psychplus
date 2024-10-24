import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import dynamic from 'next/dynamic'
import './styles.css'
import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { initializeQuillIcons, RichTextEditor } from '.'
import { deleteAttachmentsAction } from '../../actions'
import { MAX_FILE_UPLOAD_UNIT } from '../../contants'
import { RichTextEditorWrapperProps } from '../../types'
import { SendMessageSchemaType } from '../send-message-schema'
import { Attachments } from './attachments'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

let Quill
if (typeof window !== 'undefined') {
  Quill = require('react-quill').Quill
  initializeQuillIcons(Quill)
}

export const RichTextEditorWrapper = ({
  children,
  attachments,
  setAttachments,
}: RichTextEditorWrapperProps) => {
  const form = useFormContext<SendMessageSchemaType>()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const maxFileSize = 5 * MAX_FILE_UPLOAD_UNIT // 5MB
      const filteredFiles = Array.from(event.target.files).filter(
        (file: File) => {
          const isValidSize = file.size <= maxFileSize

          if (!isValidSize) {
            toast.error(`File too large: ${file.name}`)
          }

          return isValidSize
        },
      )

      // Map files to Attachment format if needed
      const newAttachments = filteredFiles.map((file) => ({
        id: file.name, // or a generated ID
        name: file.name,
        file, // Store the actual File object
        size: file.size,
      }))

      if (newAttachments.length > 0) {
        setAttachments([...attachments, ...newAttachments])
      }
    }
  }

  const handleDeleteFile = async (
    index?: number,
    messageId?: string,
    attachmentId?: string,
  ) => {
    if (attachmentId && messageId) {
      const results = await deleteAttachmentsAction({
        messageId: messageId,
        attachmentId: attachmentId,
      })
      if (results.state === 'error') {
        toast.error('Attachment delete failed')
      }
    }
    const newFiles = attachments.filter((_, i) => i !== index)
    setAttachments(newFiles)
  }

  return (
    <Box className="bg-pp-bg-table-cell border-pp-gray-2 !mt-6 w-[750px] rounded-4 border">
      {children}
      <ReactQuill
        value={form.watch('text') || ''}
        className="rounded-t-4"
        onChange={(newValue) => {
          form.setValue('text', newValue)
        }}
        modules={RichTextEditor.modules}
        placeholder="Write your message here..."
      />
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple
      />
      <Attachments
        attachments={attachments}
        handleDeleteFile={handleDeleteFile}
      />
    </Box>
  )
}
RichTextEditorWrapper.displayName = 'RichTextEditorWrapper'
