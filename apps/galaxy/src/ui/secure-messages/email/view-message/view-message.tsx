import React from 'react'
import { Box, Flex, Separator } from '@radix-ui/themes'
import { useStore } from '../../store'
import { ActiveComponent } from '../../types'
import { ComposeNewEmail } from '../compose-message/compose-new-email-template'
import { ViewMessageAttachment } from './view-message-attachment'
import { ViewMessageHeader } from './view-message-header'
import { ViewMessageHeaderTitle } from './view-message-header-title'
import { ViewMessageProfileDetails } from './view-message-profile-details'
import { ViewMessageText } from './view-message-text'

const ViewMessage = ({
  boxRef,
  isActiveTab,
}: {
  boxRef: React.RefObject<HTMLDivElement>
  isActiveTab: boolean
}) => {
  const { activeComponent, previewSecureMessage } = useStore((state) => ({
    activeComponent: state.activeComponent,
    previewSecureMessage: state.previewSecureMessage,
  }))

  const conversation =
    previewSecureMessage?.secureMessage?.secureMessageConversations?.filter(
      (a) => a.messageStatus !== 'Draft',
    )
  const hasConversation = !!conversation?.length

  const isReplyingOrForwarding =
    activeComponent === ActiveComponent.REPLY ||
    activeComponent === ActiveComponent.REPLY_TO_ALL ||
    activeComponent === ActiveComponent.FORWARD

  return (
    <Flex direction="column" className="w-full" ref={boxRef}>
      <ViewMessageHeader />
      {hasConversation ? (
        conversation?.map((message, index) => (
          <React.Fragment key={message.id}>
            <Box className="bg-white rounded-lg shadow-lg mb-4 px-5 py-4">
              {index === 0 && <ViewMessageHeaderTitle message={message} />}
              <ViewMessageProfileDetails message={message} />
              <ViewMessageText message={message} />
              <ViewMessageAttachment message={message} />
            </Box>
            {index !== conversation.length - 1 && (
              <Separator className="w-full" />
            )}
          </React.Fragment>
        ))
      ) : (
        <Box className="bg-white rounded-lg shadow-lg  p-6 py-4">
          <ViewMessageHeaderTitle
            message={previewSecureMessage?.secureMessage ?? {}}
          />
          <ViewMessageProfileDetails
            message={previewSecureMessage?.secureMessage ?? {}}
          />
          <ViewMessageText
            message={previewSecureMessage?.secureMessage ?? {}}
          />
          <ViewMessageAttachment
            message={previewSecureMessage?.secureMessage ?? {}}
          />
        </Box>
      )}
      <Box className="bg-white rounded-lg shadow-lg p-4">
        {isReplyingOrForwarding ? (
          <ComposeNewEmail isActiveTab={isActiveTab} />
        ) : null}
      </Box>
    </Flex>
  )
}

export { ViewMessage }
