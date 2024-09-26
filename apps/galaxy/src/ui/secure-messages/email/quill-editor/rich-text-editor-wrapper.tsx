import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import './styles.css'
import { Box } from '@radix-ui/themes'
import { initializeQuillIcons, RichTextEditor } from '.'
import { MAX_FILE_UPLOAD_UNIT } from '../../contants'
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
}: React.PropsWithChildren) => {
  const [attachments, setAttachments] = useState<File[]>([])

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

      if (filteredFiles.length > 0) {
        setAttachments([...attachments, ...filteredFiles])
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
        value={''}
        className="rounded-t-4"
        onChange={(value) => {}}
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
