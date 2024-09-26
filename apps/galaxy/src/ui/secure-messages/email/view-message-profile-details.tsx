import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { SecureMessage } from '../types'
import { ViewMessageCreatedByFullName } from './view-message-name'
import { ViewMessagePopover } from './view-message-popover'
import { ViewMessageProfileDetailsAvatar } from './view-message-profile-details-avatar'
import { ViewMessageProfileDetailsBadge } from './view-message-profile-details-badge'
import { ViewMessageToText } from './view-message-to-text'

const ViewMessageProfileDetails = ({
  previewSecureMessage,
}: {
  previewSecureMessage: SecureMessage | null
}) => {
  return (
    <Flex className="my-4 flex items-start ">
      <ViewMessageProfileDetailsAvatar />
      <Box>
        <ViewMessageCreatedByFullName
          createdByFullName={previewSecureMessage?.metadata?.createdByFullName}
        />
        <ViewMessageProfileDetailsBadge
          sendMode={previewSecureMessage?.channels?.[0]?.sendMode}
        />
        <Flex align="center" className="relative">
          <ViewMessageToText previewSecureMessage={previewSecureMessage} />
          <ViewMessagePopover previewSecureMessage={previewSecureMessage} />
        </Flex>
      </Box>
    </Flex>
  )
}

export { ViewMessageProfileDetails }
