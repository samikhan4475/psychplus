import React from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { initializeQuillIcons, RichTextEditor } from '.'
import { deleteAttachmentsAction } from '../../actions'
import { MAX_FILE_UPLOAD_UNIT } from '../../contants'
import { RichTextEditorWrapperProps } from '../../types'
import { Attachments } from './attachments'
import './styles.css'
import { SendMessageSchemaType } from '../compose-message/send-message-schema'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

let Quill
if (typeof window !== 'undefined') {
  Quill = require('react-quill').Quill
  initializeQuillIcons(Quill)
}

const RichTextEditorWrapper = ({
  children,
  attachments,
  setAttachments,
  removeAttachment,
  uploadingAttachmentIds,
  deletingAttachmentIds,
  setDeletingAttachmentIds,
}: RichTextEditorWrapperProps) => {
  const form = useFormContext<SendMessageSchemaType>()
  const text = useWatch({ control: form.control, name: 'text' })

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
    index: number,
    messageId?: string,
    attachmentId?: string,
  ) => {
    const isConfirmed = confirm(
      'Are you sure you want to delete this attachment?',
    )
    if (!isConfirmed) return
    if (attachmentId && messageId) {
      setDeletingAttachmentIds((prev) => [...prev, attachmentId])
      const results = await deleteAttachmentsAction({
        messageId: messageId,
        attachmentId: attachmentId,
      })
      setDeletingAttachmentIds((prev) =>
        prev.filter((id) => id !== attachmentId),
      )
      if (results.state === 'error') {
        return toast.error('Attachment delete failed')
      }
      removeAttachment(index)
    }
  }

  return (
    <Box className="bg-pp-bg-table-cell border-pp-gray-2 X!mt-6 !mt-0 rounded-4 border-t">
      {children}
      <ReactQuill
        value={text || ''}
        className="bgX-pp-red-2 rounded-t-4"
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
        uploadingAttachmentIds={uploadingAttachmentIds}
        deletingAttachmentIds={deletingAttachmentIds}
      />
    </Box>
  )
}

export { RichTextEditorWrapper }
