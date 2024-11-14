import React from 'react'
import { Box } from '@radix-ui/themes'
import { AttachmentsProps } from '../../types'
import { FileUploadCard } from './file-upload-card'

const Attachments = ({
  attachments,
  handleDeleteFile,
  uploadingAttachmentIds,
  deletingAttachmentIds,
}: AttachmentsProps & {
  uploadingAttachmentIds: string[]
  deletingAttachmentIds: string[]
}) => {
  return (
    <>
      {attachments.length > 0 && (
        <Box className="bg-white flex flex-wrap gap-2 rounded-4 p-4 pt-4">
          {attachments.map((attachment, index) => (
            <FileUploadCard
              key={`${attachment.name}-${index}`}
              attachment={attachment}
              handleDeleteFile={() => {
                handleDeleteFile(index, attachment?.messageId, attachment?.id)
              }}
              uploading={uploadingAttachmentIds.includes(attachment.id ?? '')}
              deleting={deletingAttachmentIds.includes(attachment.id ?? '')}
            />
          ))}
        </Box>
      )}
    </>
  )
}

export { Attachments }
