import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ConversationMessage, SecureMessage } from '../../types'
import { ViewMessageCreatedByFullName } from './view-message-name'
import { ViewMessagePopover } from './view-message-popover'
import { ViewMessageProfileDetailsAvatar } from './view-message-profile-details-avatar'
import { ViewMessageProfileDetailsBadge } from './view-message-profile-details-badge'
import { ViewMessageToText } from './view-message-to-text'

const ViewMessageProfileDetails = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  return (
    <Flex className="my-4 flex items-start ">
      <ViewMessageProfileDetailsAvatar message={message} />

      <Box>
        <ViewMessageCreatedByFullName message={message} />
        <ViewMessageProfileDetailsBadge message={message} />
        <Flex align="center" className="relative">
          <ViewMessageToText message={message} />
          <ViewMessagePopover message={message} />
        </Flex>
      </Box>
    </Flex>
  )
}

export { ViewMessageProfileDetails }
