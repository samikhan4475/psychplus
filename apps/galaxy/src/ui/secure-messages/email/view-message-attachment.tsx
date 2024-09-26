import React from 'react'
import { Box } from '@radix-ui/themes'
import { ViewMessageAttachmentProps } from '../types'
import { FileUplaodCard } from './quill-editor'

const ViewMessageAttachment = ({
  previewSecureMessage,
  handleDeleteFile,
  activeComponent,
}: ViewMessageAttachmentProps) => {
  return (
    <Box className="mt-4 flex flex-wrap gap-2">
      {previewSecureMessage?.attachments?.map((attachment, index) => (
        <FileUplaodCard
          key={`${attachment.id}-${index}`}
          attachment={attachment}
          activeComponent={activeComponent}
          handleDeleteFile={() => handleDeleteFile(index)}
        />
      ))}
    </Box>
  )
}

export { ViewMessageAttachment }
