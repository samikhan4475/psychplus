import React from 'react'
import { Box } from '@radix-ui/themes'
import { useStore } from '../../store'
import { FileUploadCard } from '../quill-editor'

const ViewMessageAttachment = () => {
  const { previewSecureMessage, setPreviewSecureMessage } = useStore(
    (state) => state,
  )

  const handleDeleteFile = (index: number) => {
    const newFiles = previewSecureMessage?.secureMessage?.attachments?.filter(
      (_, i) => i !== index,
    )
    setPreviewSecureMessage({
      secureMessage: {
        ...previewSecureMessage?.secureMessage,
        attachments: newFiles,
      },
      activeTab: previewSecureMessage?.activeTab,
    })
  }
  return (
    <Box className="mt-4 flex flex-wrap gap-2">
      {previewSecureMessage.secureMessage?.attachments?.map(
        (attachment, index) => (
          <FileUploadCard
            key={`${attachment.id}-${index}`}
            attachment={attachment}
            viewMessage={true}
            handleDeleteFile={() => handleDeleteFile(index)}
          />
        ),
      )}
    </Box>
  )
}

export { ViewMessageAttachment }
