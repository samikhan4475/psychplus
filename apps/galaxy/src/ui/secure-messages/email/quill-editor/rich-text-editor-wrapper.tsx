import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import './styles.css'
import { Box } from '@radix-ui/themes'
import { initializeQuillIcons, RichTextEditor } from '.'
import { MAX_FILE_UPLOAD_UNIT } from '../../contants'
import { useStore } from '../../store'
import {
  ActiveComponent,
  Attachment,
  RichTextEditorWrapperProps,
} from '../../types'
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
  activeComponent,
}: RichTextEditorWrapperProps) => {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [value, setValue] = useState<string>('')
  const { previewSecureMessage } = useStore((state) => state)

  useEffect(() => {
    if (activeComponent === ActiveComponent.FORWARD && previewSecureMessage) {
      // Initialize attachments with existing ones
      setAttachments(previewSecureMessage.attachments || [])
      setValue(previewSecureMessage.text || '')
    }
  }, [activeComponent, previewSecureMessage])

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const maxFileSize = 5 * MAX_FILE_UPLOAD_UNIT // 5MB
      const filteredFiles = Array.from(event.target.files).filter(
        (file: File) => {
          const isValidSize = file.size <= maxFileSize

          if (!isValidSize) {
            console.error(`File too large: ${file.name}`)
          }

          return isValidSize
        },
      )

      // Map files to Attachment format if needed
      const newAttachments = filteredFiles.map((file) => ({
        id: file.name, // or a generated ID
        name: file.name,
        file, // Store the actual File object
      }))

      if (newAttachments.length > 0) {
        setAttachments([...attachments, ...newAttachments])
      }
    }
  }

  const handleDeleteFile = (index: number) => {
    const newFiles = attachments.filter((_, i) => i !== index)
    setAttachments(newFiles)
  }

  return (
    <Box className="bg-pp-bg-table-cell border-pp-gray-2 !mt-6 rounded-4 border">
      {children}
      <ReactQuill
        value={value}
        className="rounded-t-4"
        onChange={(value) => setValue(value)}
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
