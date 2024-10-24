import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ViewMessageCreatedByFullName } from './view-message-name'
import { ViewMessagePopover } from './view-message-popover'
import { ViewMessageProfileDetailsAvatar } from './view-message-profile-details-avatar'
import { ViewMessageProfileDetailsBadge } from './view-message-profile-details-badge'
import { ViewMessageToText } from './view-message-to-text'

const ViewMessageProfileDetails = () => {
  return (
    <Flex className="my-4 flex items-start ">
      <ViewMessageProfileDetailsAvatar />

      <Box>
        <ViewMessageCreatedByFullName />
        <ViewMessageProfileDetailsBadge />
        <Flex align="center" className="relative">
          <ViewMessageToText />
          <ViewMessagePopover />
        </Flex>
      </Box>
    </Flex>
  )
}

export { ViewMessageProfileDetails }
