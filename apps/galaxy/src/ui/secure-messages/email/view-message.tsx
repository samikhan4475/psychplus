import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useStore } from '../store'
import { ActiveComponentProps, SecureMessage } from '../types'
import { ViewMessageAttachment } from './view-message-attachment'
import { ViewMessageHeader } from './view-message-header'
import { ViewMessageHeaderTitle } from './view-message-header-title'
import { ViewMessageProfileDetails } from './view-message-profile-details'
import { ViewMessageReplyForward } from './view-message-reply'
import { ViewMessageText } from './view-message-text'

const ReviewEmail = ({
  setActiveComponent,
  activeComponent,
}: ActiveComponentProps) => {
  const { previewSecureMessage, setPreviewSecureMessage } = useStore(
    (state) => state,
  )

  const handleDeleteFile = (index: number) => {
    const newFiles = previewSecureMessage?.attachments?.filter(
      (_, i) => i !== index,
    )
    setPreviewSecureMessage({
      ...previewSecureMessage,
      attachments: newFiles ?? [],
    } as SecureMessage)
  }

  return (
    <Flex direction="column" className="w-full">
      <ViewMessageHeader setActiveComponent={setActiveComponent} />
      <Box className="bg-white rounded-lg shadow-lg  p-6 py-4">
        <ViewMessageHeaderTitle subject={previewSecureMessage?.subject} />
        <ViewMessageProfileDetails
          previewSecureMessage={previewSecureMessage}
        />
        <ViewMessageText text={previewSecureMessage?.text} />
        <ViewMessageAttachment
          activeComponent={activeComponent}
          handleDeleteFile={handleDeleteFile}
          previewSecureMessage={previewSecureMessage}
        />
        <ViewMessageReplyForward />
      </Box>
    </Flex>
  )
}

export { ReviewEmail }
