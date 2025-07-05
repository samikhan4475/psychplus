import { Box } from '@radix-ui/themes'
import { useStore } from '../../store'
import { ConversationMessage, SecureMessage } from '../../types'
import { FileUploadCard } from '../quill-editor'

const ViewMessageAttachment = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const { previewSecureMessage, setPreviewSecureMessage } = useStore(
    (state) => state,
  )
  const handleDeleteFile = (index: number) => {
    const newFiles = message?.attachments?.filter((_, i) => i !== index)
    setPreviewSecureMessage({
      secureMessage: {
        ...message,
        attachments: newFiles,
      },
      activeTab: previewSecureMessage?.activeTab,
    })
  }
  if (!message?.attachments?.length) return null
  return (
    <Box className="mt-4 flex flex-wrap gap-2">
      {message?.attachments?.map((attachment, index) => (
        <FileUploadCard
          key={`${attachment.id}-${index}`}
          attachment={attachment}
          viewMessage={true}
          handleDeleteFile={() => handleDeleteFile(index)}
        />
      ))}
    </Box>
  )
}

export { ViewMessageAttachment }
